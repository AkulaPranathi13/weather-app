const request = require('request')
 
const forecast = ( { location, longitude, latitude }, callback) => {
    const url = 'https://api.darksky.net/forecast/468ff4f16e9e2f0e9a6601ef531cdc06/'+encodeURIComponent(latitude)+','+ encodeURIComponent(longitude) +'?units=si'
    debugger
    request({ url, json:true }, (error, { body }) => {
        if(error){
            callback('Cannot connect to weather service.')
        } else if (body.error) {
            callback('No response received from server.')
        } else {
            callback(undefined, 
                {
                temperature: body.currently.temperature,
                precip: body.currently.precipProbability,
                summary: body.daily.summary,
                forecast: body.daily.summary + " It is currently " + body.currently.temperature + " degrees outside, with a " + body.currently.precipProbability + "% chance of rain. The maximum temperature is "+body.daily.data[0].temperatureMax + " degrees."
            }
            )
            console.log(body.daily.data[0])
        }
    })
}

module.exports = forecast