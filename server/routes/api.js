const express = require('express')
const router = express.Router()
var request = require('request')
var moment = require('moment')


const City = require('./models/City')



// router.get('/user/:user', function (req, res) {
//     let userName = req.params.user
//     console.log(userName)
//     City = mongoose.model(`${userName}`, citySchema)
//     res.end()
//   })
  


router.get('/location', function (req, res) {
    const ipInfo = req.ipInfo
    res.send(ipInfo.city)


})
//routes

router.get('/city/:cityName', function (req, res) {
    let name = req.params.cityName
    request(`http://api.weatherstack.com/current?access_key=5a20213477f5816aa6d9b626cf0f8ede&query=${name}`, function (error, response, body) {

        let data = JSON.parse(body)
        let d = new Date()


        // console.log(data)
        if (data.location) {
            let newdata = {
                name: data.location.name,
                updatedAt: moment(d).fromNow(),
                temperature: data.current.temperature,
                farenheit: Math.round(data.current.temperature * 1.8),
                condition: data.current.weather_descriptions[0],
                conditionPic: data.current.weather_icons[0],
                saved: false,
                code: data.current.weather_code
            }
            res.send(newdata)
        } else {
            res.end()
        }
        // console.log(data)

    })

})

router.get('/cities', function (req, res) {
    City.find({}).exec(function (err, response) {
        //console.log(response)

        res.send(response)
    })

})

router.post('/city', function (req, res) {

    let { name, updatedAt, temperature, farenheit, condition, conditionPic } = req.body

    let city = new City({
        name,
        updatedAt,
        temperature,
        farenheit,
        condition,
        conditionPic,
        saved: true
    })
    city.save()
    res.end()
})

router.delete('/city/:cityName', function (req, res) {

    let cityName = req.params.cityName

    City.findOneAndRemove({ "name": cityName }, function (err, response) {

    })
    res.end()
})

// router.get('/user/:user', function(req, res){
//     let userName = req.params.user

    
// })


module.exports = router