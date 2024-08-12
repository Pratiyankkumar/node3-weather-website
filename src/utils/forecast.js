const request = require('postman-request')

const forecast = (lat, lon, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=22766c7d5b146769724082f826caad1d&units=metric`;
  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback((error + ' Unable to connect to weather service!'), undefined)
    } else if (body.cod > 200) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, body)
    }
  })
}

module.exports = forecast;