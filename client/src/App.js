import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FIND_API_URL, GET_SORTED_URL, GET_ALL_PRODUCTS } from './apiConfig';
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
import { CreateStore, UpdateStore, UpdateStoreOrders, UpdateStoreRevenue, UpdateStoreTransactions } from './functions_store';
import { CreateEvent, UpdateRSVP } from './functions_event';
import { getAddress } from './functions_python';

function App() {
  let [signedIn, setSignedIn] = useState(false)
  let [user, setUser] = useState({ name: '', email: '' })

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


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home UpdateStoreTransactions={UpdateStoreTransactions} UpdateRSVP={UpdateRSVP} UpdateStoreOrders={UpdateStoreOrders} UpdateStoreRevenue={UpdateStoreRevenue} user={user} food={foodNearMe} stores={storesNearMe} events={eventsNearMe} openSignUp={openSignUp} closeSignUp={closeSignUp} openLogIn={openLogIn} closeLogIn={closeLogIn} signedIn={signedIn} setSignedIn={setSignedIn} />} />
          <Route path="/discover" element={<Discover UpdateStoreTransactions={UpdateStoreTransactions} UpdateRSVP={UpdateRSVP} UpdateStoreOrders={UpdateStoreOrders} UpdateStoreRevenue={UpdateStoreRevenue} getSortedProductsEventsStores={getSortedProductsEventsStores} user={user} food={foodNearMe} stores={storesNearMe} events={eventsNearMe} openSignUp={openSignUp} closeSignUp={closeSignUp} openLogIn={openLogIn} closeLogIn={closeLogIn} signedIn={signedIn} setSignedIn={setSignedIn} />} />
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
