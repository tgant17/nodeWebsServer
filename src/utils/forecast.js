const request = require('request')


const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dbbaaf8db38f06b7e878c4fc16064147&query=' + lat + ',' + long + '&units=f'


    request({url, json: true}, (error, { body } = {}) => {
        if(error)
        {
            callback('unable to connect to weather services', undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location', undefined)
        }
        else 
        {
            callback(undefined, 
                body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out' 
            )
        }
    })
    // console.log(url)
}

module.exports = forecast