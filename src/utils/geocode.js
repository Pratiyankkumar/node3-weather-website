const request = require('postman-request')

const geocode = (address, callback) => {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&bias=proximity:7.065202,52.430918&format=json&apiKey=7931b13264eb440ba0637971a9068480`

  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (body.results.length === 0) {
      callback('Unable to find loaction', undefined)
    } else {
      callback(undefined, {
        latitude: body.results[0].lat,
        longitude: body.results[0].lon,
        location: body.results[0].address_line1
      })
    }
  })
}

module.exports = geocode;