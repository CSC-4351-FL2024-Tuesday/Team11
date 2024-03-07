const express = require('express')
const app = express()
const cors = require('cors')
const User = require('./models/user.model')
const mongoose = require('mongoose')
const corsOptions ={
    origin: "*",
    preflightContinue: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionSuccessStatus:204,
 }
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json())
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)

app.post('/api/createUser', async (req, res) => {
  try {
      // Extracting provided fields
      const { name, email, pass } = req.body;

      // Create user with empty store and event
      await User.create({
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
        stores: [],
        events: []
      });

      console.log("User Created");
      res.json({ status: 'ok' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ status: 'error', error: "User Creation Error" });
  }
});

app.post('/api/findUser', async (req, res) => {
    let email = req.body.email;
    try {
        const userLogin = await User.findOne({ email: email });
        res.json({ status: "ok", user: userLogin });
    } catch (err) {
        res.json({ status: "error", error: err })
    }
})

app.post('/api/login', async (req, res) => {
  try {
    const { email, pass } = req.body;
    if (!email || !pass) {
      return res.status(400).json({ error: "Incomplete fields" });
    }

    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = pass === userLogin.pass;

      if (!isMatch) {
        return res.status(400).json({ error: "Incorrect password" });
      } else {
        // Return all user details upon successful login
        return res.json({
          message: "User login successful",
          userData: userLogin,
        });
      }
    } else {
      return res.status(400).json({ error: "User not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/updateUserStore', async (req, res) => {
  try {
    const { email, storeData } = req.body;

    if (!email || !storeData || !storeData.storeName) {
      return res.status(400).json({ error: "Incomplete fields" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("User not found")
      return res.status(404).json({ error: "User not found" });
    }

    const storeIndex = user.stores.findIndex(store => store.storeName === storeData.storeName);

    if (storeIndex === -1) {
      return res.status(404).json({ error: "Store not found for this user" });
    }

    // Update the store with the new data
    user.stores[storeIndex] = storeData;

    // Save the updated user object
    await user.save();

    return res.json({ message: "Store updated successfully", user: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.post('/api/addStoreToUser', async (req, res) => {
  try {
      const { email, storeData } = req.body;

      if (!email || !storeData) {
          return res.status(400).json({ error: "Incomplete fields" });
      }

      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Add the new store to the user's stores array
      user.stores.push(storeData);

      // Save the updated user object
      await user.save();

      return res.json({ message: "Store added to user successfully", user: user });
  } catch (error) {
    console.error(error);
      return res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/addEventToUser', async (req, res) => {
  try {
      const { email, eventData } = req.body;

      if (!email || !eventData) {
          return res.status(400).json({ error: "Incomplete fields" });
      }

      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Add the new store to the user's stores array
      user.events.push(eventData);

      // Save the updated user object
      await user.save();

      return res.json({ message: "Store added to user successfully", user: user });
  } catch (error) {
    console.error(error);
      return res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/allStoresProductsEvents', async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find({}, { stores: 1 });

    // Array to store allStores
    let allStores = [];
    let allProducts = [];
    let allEvents = [];

    // Iterate over each user
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      
      // Iterate over each store of the user
      for (let j = 0; j < user.stores.length; j++) {
        const store = user.stores[j];
        
        allStores = allStores.concat(store);
        allProducts = allProducts.concat(store.storeProducts);
      }
    }

    const users_2 = await User.find({}, { events: 1 });

    // Iterate over each user
    for (let i = 0; i < users_2.length; i++) {
      const user2 = users_2[i];
      
      // Iterate over each store of the user
      for (let j = 0; j < user2.events.length; j++) {
        const event = user2.events[j];
        
        allEvents = allEvents.concat(event);
      }

    }

    // Return the aggregated list of all products
    res.json({ products: allProducts, stores: allStores, events: allEvents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post('/api/updateStoreRevenue', async (req, res) => {
  try {
    const { storeName, revenue_to_add } = req.body;

    if (!storeName || !revenue_to_add || isNaN(revenue_to_add)) {
      return res.status(400).json({ error: "Incomplete or invalid fields" });
    }

    // Find all users in the database
    const users = await User.find({}, { stores: 1 });

    // Variable to track if the store was found
    let storeFound = false;

    // Iterate over each user
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      
      // Iterate over each store of the user
      for (let j = 0; j < user.stores.length; j++) {
        const store = user.stores[j];
        
        if (store.storeName === storeName) {
          // Update the store's revenue
          store.storeRevenue = (store.storeRevenue || 0) + parseFloat(revenue_to_add);
          storeFound = true;
          break; // Exit the loop since the store was found
        }
      }

      if (storeFound) {
        // Save the updated user object
        await user.save();
        return res.json({ message: "Store revenue updated successfully" });
      }
    }

    // If the store was not found among all users' stores
    return res.status(404).json({ error: "Store not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.post('/api/incrementStoreOrder', async (req, res) => {
  try {
    const { storeName } = req.body;
    console.log(storeName)
    if (!storeName) {
      return res.status(400).json({ error: "Incomplete fields" });
    }

    // Find all users in the database
    const users = await User.find({}, { stores: 1 });

    // Variable to track if the store was found
    let storeFound = false;

    // Iterate over each user
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      
      // Iterate over each store of the user
      for (let j = 0; j < user.stores.length; j++) {
        const store = user.stores[j];
        
        if (store.storeName === storeName) {
          // Increment the store's total orders
          store.storeTotalOrders = (store.storeTotalOrders || 0) + 1;
          storeFound = true;
          break; // Exit the loop since the store was found
        }
      }

      if (storeFound) {
        // Save the updated user object
        await user.save();
        return res.json({ message: "Store order count incremented successfully" });
      }
    }

    // If the store was not found among all users' stores
    return res.status(404).json({ error: "Store not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.post('/api/RSVP', async (req, res) => {
  try {
    const { eventName } = req.body;
    console.log(eventName)
    if (!eventName) {
      return res.status(400).json({ error: "Incomplete fields" });
    }

    // Find all users in the database
    const users = await User.find({}, { events: 1 });

    // Variable to track if the store was found
    let eventFound = false;

    // Iterate over each user
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      
      // Iterate over each store of the user
      for (let j = 0; j < user.events.length; j++) {
        const event = user.events[j];
        
        if (event.eventName === eventName) {
          // Increment the store's total orders
          event.eventRSVP = (event.eventRSVP || 0) + 1;
          eventFound = true;
          break; // Exit the loop since the store was found
        }
      }

      if (eventFound) {
        // Save the updated user object
        await user.save();
        return res.json({ message: "Event RSVP count incremented successfully" });
      }
    }

    // If the store was not found among all users' stores
    return res.status(404).json({ error: "EVENT not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(1337, () => {
	console.log('Server started on 1337')
})