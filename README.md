# Food Saver App

## Description
The Food Saver App is a platform where food providers can sign up and list about-to-expire foods at discounted prices, while users can browse and purchase these items. The app is built using ReactJS and the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Basic Features
- **Supplier Registration:** Food providers can register with the app by providing necessary details.
- **Listing of About-to-Expire Foods:** Suppliers can list their soon-to-expire food items with details like type, quantity, expiration date, and discounted price.
- **Automatic Deletion of Expired Foods:** Expired listings are automatically removed from the platform.
- **User Authentication:** Users can log in to the app to view listings and make purchases.
- **View Listings:** Users can browse available food items.
- **Location-Based Search:** Users can view a map showing nearby food provider locations.

## Technologies Used
- ReactJS: Frontend framework for building user interfaces.
- MongoDB: NoSQL database for storing supplier and food item information.
- Express.js: Web application framework for building the backend server.
- Node.js: JavaScript runtime environment for executing server-side code.
- Google Maps API: Used to display a map with nearby locations.

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd food-saver-app`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     PORT=3000
     MONGODB_URI=<your-mongodb-uri>
     GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
     ```
5. Start the development server: `npm start`

## Contributing
Contributions are welcome! If you have any suggestions or want to report issues, please open an issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).