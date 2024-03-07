const API_BASE_URL = 'http://localhost:1337';
const ML_BASE_URL = 'http://localhost:5000';

export const LOGIN_API_URL = `${API_BASE_URL}/api/login`;
export const SIGNUP_API_URL = `${API_BASE_URL}/api/createUser`;
export const FIND_API_URL = `${API_BASE_URL}/api/findUser`;
export const ADD_STORE_TO_USER_URL = `${API_BASE_URL}/api/addStoreToUser`;
export const UPDATE_STORE_URL = `${API_BASE_URL}/api/updateUserStore`;
export const UPDATE_EVENT_RSVP = `${API_BASE_URL}/api/RSVP`;
export const UPDATE_STORE_REVENUE_URL = `${API_BASE_URL}/api/updateStoreRevenue`;
export const UPDATE_STORE_ORDERS_URL = `${API_BASE_URL}/api/incrementStoreOrder`;
export const GET_ALL_PRODUCTS = `${API_BASE_URL}/api/allStoresProductsEvents`;
export const ADD_EVENT_TO_USER_URL = `${API_BASE_URL}/api/addEventToUser`;
export const GET_SORTED_URL = `${ML_BASE_URL}/api/getAIResponse`;
export const GET_ADDRESS = `${ML_BASE_URL}/api/getAddress`;