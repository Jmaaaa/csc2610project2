const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    types: [{
        name: String,
        days: [{
            day: String,
            availability: [{
                lotName: String,
                lotNumber: String,
                totalSpaces: Number,
                percentFull: [Number]
            }]
        }]
    }]
})

module.exports = mongoose.model('Parking', dataSchema, 'parking')