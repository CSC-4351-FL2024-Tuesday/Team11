import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FIND_API_URL, ADD_STORE_TO_USER_URL, GET_SORTED_URL, GET_ALL_PRODUCTS, UPDATE_STORE_URL, ADD_EVENT_TO_USER_URL, UPDATE_STORE_ORDERS_URL, UPDATE_STORE_REVENUE_URL, UPDATE_EVENT_RSVP, GET_ADDRESS } from './apiConfig';
import Home from "./components/views/Home/home";
import Error404 from "./components/views/Error404/error404";
import LogIn from "./components/shared/LogIn/login"
import SignUp from "./components/shared/SignUp/signup"
import Discover from './components/views/Discover/discover';
import Map from './components/views/Map/map';
import Dashboard from './components/views/Dashboard/dashboard';
import Create from './components/views/Create/create';
import Create_Event from './components/views/Create Event/createEvent';
import Edit from './components/views/Edit/edit';

function App() {
  let [signedIn, setSignedIn] = useState(false)
  let [user, setUser] = useState({ name: '', email: '' })

  let [newUser, setNewUser] = useState({
    name: '',
    email: '',
    stores: [
      {
        storeName: 'Delicious Diner',
        storeLocation: 'Location',
        storeImageUrl: 'https://example.com/store-image.jpg',
        storeTagline: 'Best Diner in Town',
        storeDescription: 'Description of Delicious Diner',
        storeProducts: [
          {
            productName: "Pizza",
            productImageUrl: "https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_tM7V4fZBBw8RLmZo0Bi8WhtO2EosTRFD.jpg",
            productQuantity: 1, // Adding one item to the store
            productDescription: "Delicious Diner",
            productExpiry: "https://example.com/delicious-diner"
          }
        ],
        storeTransactions: [],
        storeRevenue: 0,
        storeTotalOrders: 0
      },
      {
        storeName: 'Tasty Tacos',
        storeLocation: 'Location',
        storeImageUrl: 'https://example.com/store-image.jpg',
        storeTagline: 'Best Tacos in Town',
        storeDescription: 'Description of Tasty Tacos',
        storeProducts: [
          {
            productName: "Tacos",
            productImageUrl: "https://www.onceuponachef.com/images/2023/08/Beef-Tacos.jpg",
            productQuantity: 1,
            productDescription: "Tasty Tacos",
            productExpiry: "https://example.com/tasty-tacos"
          }
        ],
        storeTransactions: [],
        storeRevenue: 0,
        storeTotalOrders: 0
      },
      {
        storeName: 'Pizza Paradise',
        storeLocation: 'Location',
        storeImageUrl: 'https://example.com/store-image.jpg',
        storeTagline: 'Best Pizza in Town',
        storeDescription: 'Description of Pizza Paradise',
        storeProducts: [
          {
            productName: "Calzones",
            productImageUrl: "https://mojo.generalmills.com/api/public/content/VNG1nkum9UuY9aJqRLDhJQ_gmi_hi_res_jpeg.jpeg?v=c144ea76&t=466b54bb264e48b199fc8e83ef1136b4",
            productQuantity: 1,
            productDescription: "Pizza Paradise",
            productExpiry: "https://example.com/pizza-paradise"
          }
        ],
        storeTransactions: [],
        storeRevenue: 0,
        storeTotalOrders: 0
      },
      {
        storeName: 'Indian Palace',
        storeLocation: 'Location',
        storeImageUrl: 'https://example.com/store-image.jpg',
        storeTagline: 'Best Indian Food in Town',
        storeDescription: 'Description of Indian Palace',
        storeProducts: [
          {
            productName: "Chicken Tikka Masala",
            productImageUrl: "https://hips.hearstapps.com/hmg-prod/images/chicken-tikka-masala1-1663341991.jpg?crop=0.683xw:1.00xh;0.221xw,0&resize=1200:*",
            productQuantity: 1,
            productDescription: "Chicken Tikka Masala",
            productExpiry: "https://example.com/indian-palace"
          }
        ],
        storeTransactions: [],
        storeRevenue: 0,
        storeTotalOrders: 0
      },
      {
        storeName: 'The Deli',
        storeLocation: 'Location',
        storeImageUrl: 'https://example.com/store-image.jpg',
        storeTagline: 'Best Sandwiches in Town',
        storeDescription: 'Description of The Deli',
        storeProducts: [
          {
            productName: "Sandwiches",
            productImageUrl: "https://hips.hearstapps.com/hmg-prod/images/italian-sandwich-recipe-2-1674500643.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*",
            productQuantity: 1,
            productDescription: "Sandwiches",
            productExpiry: "https://example.com/the-deli"
          }
        ],
        storeTransactions: [],
        storeRevenue: 0,
        storeTotalOrders: 0
      }
    ]
  });


  let [foodNearMe, setFoodNearMe] = useState([{ imageUrl: '', title: '', subtitle: '', storeUrl: '' }, { imageUrl: '', title: '', subtitle: '', storeUrl: '' }, { imageUrl: '', title: '', subtitle: '', storeUrl: '' }, { imageUrl: '', title: '', subtitle: '', storeUrl: '' }, { imageUrl: '', title: '', subtitle: '', storeUrl: '' }])
  let [storesNearMe, setStoresNearMe] = useState([{ imageUrl: '', title: '', subtitle: '', storeUrl: '' }, { imageUrl: '', title: '', subtitle: '', storeUrl: '' }, { imageUrl: '', title: '', subtitle: '', storeUrl: '' }, { imageUrl: '', title: '', subtitle: '', storeUrl: '' }, { imageUrl: '', title: '', subtitle: '', storeUrl: '' }])
  let [eventsNearMe, setEventsNearMe] = useState([{ imageUrl: '', title: '', subtitle: '', storeUrl: '' }, { imageUrl: '', title: '', subtitle: '', storeUrl: '' }, { imageUrl: '', title: '', subtitle: '', storeUrl: '' }, { imageUrl: '', title: '', subtitle: '', storeUrl: '' }, { imageUrl: '', title: '', subtitle: '', storeUrl: '' }])

  useEffect(() => {
    async function getUserDetails(email) {
      let response = await fetch(FIND_API_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          'email': email,
        }),
      })
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const userDetails = {
          name: data.user.name,
          email: data.user.email,
          events: data.user.events,
          stores: data.user.stores
        };
        setUser(userDetails);
        return userDetails
      } else {
        console.error('Failed to fetch data');
        alert("Don't mess with cookies!")

        document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location = "/"
        return "Error"
      }
    }

    const emailCookie = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('email='));

    if (emailCookie) {
      const emailValue = emailCookie.split('=')[1];
      getUserDetails(emailValue);
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [signedIn])

  async function getAllProducts() {
    let response = await fetch(GET_ALL_PRODUCTS, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    if (response.ok) {
      const data = await response.json();
      console.log("A")
      console.log(data)
      setFoodNearMe(data.products)
      setStoresNearMe(data.stores)
      setEventsNearMe(data.events)
    } else {
      console.error('Failed to fetch data');
    }
  }

  useEffect(() => {

    setTimeout(() => {
      getAllProducts()
    }, 2000);

  }, [])

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLogInOpen, setIsLogInOpen] = useState(false);

  const openSignUp = () => {
    if (isLogInOpen) {
      setIsLogInOpen(false);
    }
    setIsSignUpOpen(true);
  };

  const closeSignUp = () => {
    setIsSignUpOpen(false);
  };

  const openLogIn = () => {

    if (isSignUpOpen) {
      setIsSignUpOpen(false);
    }
    setIsLogInOpen(true);
  };

  const closeLogIn = () => {
    setIsLogInOpen(false);
  };

  async function CreateStore(email, storeData) {
    try {
      const response = await fetch(ADD_STORE_TO_USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          storeData: storeData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add store');
      }

      console.log('Store added successfully');
    } catch (error) {
      console.error('Error adding store:', error.message);
    }

  }

  async function UpdateStore(email, storeData) {
    try {
      const response = await fetch(UPDATE_STORE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          storeData: storeData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add store');
      }

      console.log('Store added successfully');
    } catch (error) {
      console.error('Error adding store:', error.message);
    }

  }

  async function CreateEvent(email, eventData) {
    try {
      const response = await fetch(ADD_EVENT_TO_USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          eventData: eventData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add store');
      }

      console.log('Store added successfully');
    } catch (error) {
      console.error('Error adding store:', error.message);
    }

  }

  async function getSortedProductsEventsStores(query) {
    let response = await fetch(GET_SORTED_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storesNearMe: storesNearMe,
        eventsNearMe: eventsNearMe,
        foodNearMe: foodNearMe,
        query: query
      }),
      method: 'POST',
    })
    console.log(response)
    if (response.ok) {
      const responseData = await response.json(); // Parse the response as JSON
      const aiResponseString = responseData.ai_response; // Get the nested string representation
      const correctedResponseString = aiResponseString.replace(/'/g, '"'); // Replace single quotes with double quotes
      console.log(correctedResponseString)
      const aiResponse = JSON.parse(correctedResponseString); // Parse the nested string representation as JSON


      // Extract food_names and other properties from aiResponse
      const foodNames = aiResponse.food_names;
      console.log(foodNearMe)
      console.log(foodNames);

      // Create a new array to hold the reordered items
      const reorderedFoodNearMe = [];

      // Iterate over filteredFoodNames
      foodNames.forEach(name => {
        // Find the item in foodNearMe with matching foodName
        const matchingItem = foodNearMe.find(item => item.productName === name);
        // If a matching item is found, add it to reorderedFoodNearMe
        if (matchingItem) {
          reorderedFoodNearMe.push(matchingItem);
        }
      });

      console.log(reorderedFoodNearMe)
      setFoodNearMe(reorderedFoodNearMe)
    } else {
      console.error('Failed to fetch data');
    }
  }


  async function UpdateStoreRevenue(storeName, revenue_to_add) {
    try {
      const response = await fetch(UPDATE_STORE_REVENUE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeName: storeName,
          revenue_to_add: revenue_to_add,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add store revenue');
      }

      console.log('Store revenue added successfully');
    } catch (error) {
      console.error('Error adding store revenue:', error.message);
    }

  }

  async function UpdateStoreOrders(storeName) {
    try {
      console.log("ABRACADA")
      const response = await fetch(UPDATE_STORE_ORDERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeName: storeName,
        }),
      });

      console.log("res")
      if (!response.ok) {
        throw new Error('Failed to add store order');
      }

      console.log('Store order added successfully');
    } catch (error) {
      console.error('Error adding store revenue:', error.message);
    }

  }

  async function UpdateRSVP(eventName) {
    try {
      console.log("ABRACADA")
      const response = await fetch(UPDATE_EVENT_RSVP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName: eventName,
        }),
      });

      console.log("res")
      if (!response.ok) {
        throw new Error('Failed to add event rsvp');
      }

      console.log('rsvp added successfully');
    } catch (error) {
      console.error('Error adding store revenue:', error.message);
    }

  }


  async function getAddress(address) {
    let response = await fetch(GET_ADDRESS, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: address
      }),
      method: 'POST',
    })
    if (response.ok) {
      const responseData = await response.json(); // Parse the response as JSON
      const aiResponseString = responseData.ai_response; // Get the nested string representation

      return aiResponseString
    } else {
      console.error('Failed to fetch data');
    }
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home UpdateRSVP={UpdateRSVP} UpdateStoreOrders={UpdateStoreOrders} UpdateStoreRevenue={UpdateStoreRevenue} user={user} food={foodNearMe} stores={storesNearMe} events={eventsNearMe} openSignUp={openSignUp} closeSignUp={closeSignUp} openLogIn={openLogIn} closeLogIn={closeLogIn} signedIn={signedIn} setSignedIn={setSignedIn} />} />
          <Route path="/discover" element={<Discover UpdateRSVP={UpdateRSVP} UpdateStoreOrders={UpdateStoreOrders} UpdateStoreRevenue={UpdateStoreRevenue} getSortedProductsEventsStores={getSortedProductsEventsStores} user={user} food={foodNearMe} stores={storesNearMe} events={eventsNearMe} openSignUp={openSignUp} closeSignUp={closeSignUp} openLogIn={openLogIn} closeLogIn={closeLogIn} signedIn={signedIn} setSignedIn={setSignedIn} />} />
          <Route path="/map" element={<Map getAddress={getAddress} user={user} food={foodNearMe} stores={storesNearMe} events={eventsNearMe} openSignUp={openSignUp} closeSignUp={closeSignUp} openLogIn={openLogIn} closeLogIn={closeLogIn} signedIn={signedIn} setSignedIn={setSignedIn} />} />
          {signedIn ?
            <>
              <Route path="/dashboard" element={<Dashboard user={user} openSignUp={openSignUp} closeSignUp={closeSignUp} openLogIn={openLogIn} closeLogIn={closeLogIn} signedIn={signedIn} setSignedIn={setSignedIn} />} />
              <Route path="/create" element={<Create user={user} CreateStore={CreateStore} openSignUp={openSignUp} closeSignUp={closeSignUp} openLogIn={openLogIn} closeLogIn={closeLogIn} signedIn={signedIn} setSignedIn={setSignedIn} />} />
              <Route path="/createEvent" element={<Create_Event user={user} CreateEvent={CreateEvent} openSignUp={openSignUp} closeSignUp={closeSignUp} openLogIn={openLogIn} closeLogIn={closeLogIn} signedIn={signedIn} setSignedIn={setSignedIn} />} />
            </>
            :
            <>
            </>
          }
          <Route path="*" element={<Error404 />} />
          {signedIn && user.stores && user.stores.map((store, index) => (
            <Route key={index} path={`/${store.storeName}`} element={
              <Edit user={user} store={store} UpdateStore={UpdateStore} openSignUp={openSignUp} closeSignUp={closeSignUp} openLogIn={openLogIn} closeLogIn={closeLogIn} signedIn={signedIn} setSignedIn={setSignedIn} />
            } />
          ))}
        </Routes>
      </BrowserRouter>
      {isSignUpOpen && (
        <SignUp className="page1_create" signedIn={signedIn} setSignedIn={setSignedIn} closePopup={closeSignUp} />
      )}

      {isLogInOpen && (
        <LogIn className="page2_create" signedIn={signedIn} setSignedIn={setSignedIn} closePopup={closeLogIn} />
      )}

    </div>
  );
}

export default App;
