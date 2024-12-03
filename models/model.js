const mongoose = require('mongoose');

// const dataSchema = new mongoose.Schema({
//     types: [{
//         name: String,
//         days: [{
//             day: String,
//             availability: [{
//                 lotName: String,
//                 lotNumber: String,
//                 totalSpaces: Number,
//                 percentFull: [Number]
//             }]
//         }]
//     }]
// })

const dataSchema = new mongoose.Schema({
    lotType: String,
    lotName: String,
    lotNumber: String,
    totalSpaces: Number,
    days: [{
        day: String,
        percentFull: [Number]
    }]
})

module.exports = mongoose.model('Parking', dataSchema, 'parking')