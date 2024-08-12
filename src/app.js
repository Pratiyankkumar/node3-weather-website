const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js')
const hbs = require('hbs');
const { error } = require('console');

const app = express();
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up hanlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Pratiyank'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'ABOUT ME',
    name: 'Pratiyank'

  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Help Pratiyank',
    title: 'Help',
    name: 'Pratiyank'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send([{
      error: 'Please provide an address first'
    }])
  }
  console.log(req.query.address)
  
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (req.query.address) {
      if (error) {
        return res.send({
          error: error
        })
      }
    
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error
          })
        }
        
        res.send([{
          location
        }, {
          forecastData
        }])
      })
    }
  })
})

// app.get('/products', (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: 'You must provide a search term'
//     })
//   }
//   console.log(req.query.search)
//   res.send({
//     products: []
//   })
// })

app.get('/help/*', (req, res) => {
  res.render('404',{
    title: '404 ',
    message: 'Help article not found',
    name: 'Pratiyank'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'My 404 Page',
    name: 'Pratiyank'
  })
})


// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
  console.log('server is up on port 3000')
})