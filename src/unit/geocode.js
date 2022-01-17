const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidG9zdW50aGV4IiwiYSI6ImNrc3JmdDQ4azBtY3kyb280aXRoNGR0bG4ifQ.GLtPuVoZl-VCnqWl701ffg&limit=1';
    request({ url, json: true }, (error, {body}) => {

        return_val = "";
        if (error) {
            callback("Unable to connect Geolocation service", undefined);
        }
        else if (body.features.length === 0) {
            callback('Address Not Found please try again', undefined);
        }
        else {
            callback('', {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                place:body.features[0].place_name
            });
        }
    });
};
module.exports = geocode
