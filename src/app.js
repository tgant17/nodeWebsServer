const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express() 

// define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tristan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About robot',
        name: 'tristan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMsg: 'You need some help?',
        title: 'Help', 
        name: 'tristan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error)
        {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
            {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData, 
                location,
                address: req.query.address
            })
        })
    })
})

// app.get('/products', (req, res) => {
//     if(!req.query.search)
//     {
//         return res.send({
//             error: "You must provide a search"
            
//         })
//     }
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Help Article Not Found',
        title: '404',
        name: 'tristan'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404', 
        errorMsg: 'Page not found',
        name: 'tristan'
    })
})

// starts up the server
// takes in port
app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) 