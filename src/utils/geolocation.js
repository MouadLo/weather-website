const request = require('request')

const geolocation = (ip,callback) => {
    const url = 'http://ip-api.com/json/'+ ip
    request({ url, json:true }, (error, { body }) => {
        if (error){
            callback(body.message, undefined)
        } else if (body.message) {
            callback(body.message, undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = geolocation