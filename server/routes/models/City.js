const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema
mongoose.connect( 'mongodb://localhost:27017/weather', { useNewUrlParser: true } )


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

const City = mongoose.model( 'city', citySchema )



module.exports = City