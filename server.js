var bodyParser = require('body-parser')
var express = require('express')
var app = express()
var mongoose = require('mongoose')
var path = require('path')
const expressip = require('express-ip');

const api = require('./server/routes/api')




app.use(expressip().getIpInfoMiddleware);

mongoose.connect("mongodb://localhost/weather")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname,  'dist')))
app.use(express.static(path.join(__dirname,  'node_modules')))
app.use('/', api)



app.listen(2500, function() {
    console.log("Server up and running on port 2500")
  })
  