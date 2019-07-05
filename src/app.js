const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath =  path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mouad Lousimi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mouad Lousimi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mouad Lousimi',
        message: 'Elit veniam eiusmod labore mollit anim adipisicing excepteur magna cupidatat ea.'
    })
})


app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide address !'
        })
    } else {
        geocode(req.query.address, (error, { latitude,longitude, location } = {}) => {
            if(error){
                return res.send({
                    error
                })
            } 
        
            forecast(latitude,longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                res.send({
                    address: req.query.address,
                    forecast: forecastData,
                    location
                })
            })
        
           
        })
    }
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Mouad Lousimi',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Mouad Lousimi',
        errorMessage: 'My 404 page'
     })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})