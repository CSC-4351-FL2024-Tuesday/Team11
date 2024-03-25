const mongoose = require('mongoose');


const { Schema } = mongoose;

// Define product schema
const ProductSchema = new Schema({
  productName: String,
  productPrice: Number,
  productImageUrl: String,
  productQuantity: String,
  productDescription: String,
  productExpiry: String,
  productStore: String
});

// Define transaction schema
const TransactionSchema = new Schema({
  productPrice: Number,
  date: String // Consider using Date type if handling dates
});

// Update store schema to include transaction schema
const StoreSchema = new Schema({
  storeName: String,
  storeLocation: String,
  storeImageUrl: String,
  storeTagline: String,
  storeDescription: String,
  storeProducts: [ProductSchema],
  storeTransactions: [TransactionSchema], // Array of TransactionSchema
  storeRevenue: Number,
  storeTotalOrders: Number
});

// Define event schema
const EventSchema = new Schema({
  eventName: String,
  eventLocation: String,
  eventTitle: String,
  eventFromDateTime: String, // Consider using Date type if handling dates
  eventToDateTime: String,   // Consider using Date type if handling dates
  eventDescription: String,
  eventImageUrl: String,
  eventRSVP: Number
});

// Define user schema
const UserSchema = new Schema({
  name: String,
  email: String,
  pass: String,
  events: [EventSchema], // Array of EventSchema
  stores: [StoreSchema]  // Array of StoreSchema
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

/*
stores
 - userid
 - storeid
 - storename
 - storeLocation
 - storeImageUrl
 - storeTagline
 - storeDescription
 - storeProducts = [productid, productid, ...]
 - storeTransactions = [transactionid, transactionid, ...]
 - storeRevenue = number
 - storeTotalOrders = number

users
 - userid
 - stores = [storeid, storeid, storeid]
 - name
 - email
 - password

products
 - productid
 - storeid
 - productName
 - productImageUrl
 - productQuantity
 - productDescription
 - productExpiry

events
 - eventid
 - userid
 - eventName
 - eventImgUrl
 - eventLocation
 - eventDate/Time
 - eventDuration
 - eventDescription

 */