const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibW91YWRsbyIsImEiOiJjanhueDB4Y3gwMHUwM21wOWlsOHJjdmRsIn0.C2CQnU5dMYypc6VUsVdU-g&limit=1'
    request({ url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to mapbox', undefined )
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode