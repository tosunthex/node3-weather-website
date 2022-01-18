const request = require('postman-request')

const forecast = (longitude,latitude, callback) => {

    url = 'http://api.weatherstack.com/current?access_key=b404c1b7ccf7d2622f7f004277daf7a3&query=' + longitude + ',' + latitude;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect weather service!", undefined);
        }
        else if (body.error) {
            callback(body.error.info, undefined);
        }
        else {
            callback('', 'In ' + body.location.name + ' it\'s currently ' + body.current.weather_descriptions[0] + ' ' + body.current.temperature + ' degrees out and feels like ' + body.current.feelslike + ' Humidity : ' + body.current.humidity);
        }
    });
};

module.exports = forecast
