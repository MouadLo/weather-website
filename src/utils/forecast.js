const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7eaa5a02a4fb322945981e7505d5b7c8/'+ latitude +',' + longitude +'?units=si'
    request({ url, json: true }, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,body.daily.data[0].summary 
                                + '. Min Temperature : ' + body.daily.data[0].temperatureMin 
                                + '. Max Temperature : ' + body.daily.data[0].temperatureMax 
                                + '. It is currently ' + body.currently.temperature 
                                + ' degress out. There is a ' + body.currently.precipIntensity + ' % chance of rain. ')
        }
    })     
}

module.exports = forecast