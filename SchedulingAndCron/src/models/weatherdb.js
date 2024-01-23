const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema({
    name: String,
        temp: String,
        humidity: Number,
        speed: Number,

    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const WeatherData = mongoose.model('WeatherData', weatherDataSchema);

module.exports = WeatherData;
