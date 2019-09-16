const mongoose = require('mongoose')
const Schema = mongoose.Schema
const express = require('express')
const router = express.Router()
mongoose.connect('mongodb://localhost:27017/weather', { useNewUrlParser: true })




const citySchema = new Schema({
  name: String,
  updatedAt: String,
  temperature: Number,
  farenheit: Number,
  condition: String,
  conditionPic: String,
  saved: Boolean,
  code: Number,
})

 let City = mongoose.model(`city`, citySchema)










module.exports = City