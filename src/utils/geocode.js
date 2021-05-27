const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibmljb2xhYXMiLCJhIjoid2d3SEFpWSJ9.IaZLxScRS7TGFAUJHM1JNQ&limit=1'

    request({ url, json:true }, (error, {body})=>{
        if(error){
            callback('Unable to connect to location services.',undefined)
        } else if (body.message === "Forbidden") {
            callback('Something went wrong. Try with another address.')
        }else if (body.features.length === 0) {
            callback('Cannot find location. Try with another address.')
        } else{
            const location = body.features[0].place_name
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]             
            callback(undefined,{location, longitude,latitude})
        }
    })
}

module.exports = geocode