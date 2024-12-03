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
    lotType: { 
        type: String,
        required: true
    },
    lotName: { 
        type: String,
        required: true
    },
    lotNumber: { 
        type: String,
        required: true
    },
    totalSpaces: { 
        type: Number,
        required: true
    },
    days: {
        // type: Map,
        // required: true,
        // of: {
        //     Monday: {
        //         type: Map,
        //         required: true,
        //         of: {
        //             percentFull: {
        //                 type:[Number],
        //                 default: [null, null, null, null]
        //             }
        //         }
        //     },
        //     Tuesday: {
        //         type: Map,
        //         required: true,
        //         of: {
        //             percentFull: {
        //                 type:[Number],
        //                 default: [null, null, null, null]
        //             }
        //         }
        //     },
        //     Wednesday: {
        //         type: Map,
        //         required: true,
        //         of: {
        //             percentFull: {
        //                 type:[Number],
        //                 default: [null, null, null, null]
        //             }
        //         }
        //     },
        //     Thursday: {
        //         type: Map,
        //         required: true,
        //         of: {
        //             percentFull: {
        //                 type:[Number],
        //                 default: [null, null, null, null]
        //             }
        //         }
        //     },
        //     Friday: {
        //         type: Map,
        //         required: true,
        //         of: {
        //             percentFull: {
        //                 type:[Number],
        //                 default: [null, null, null, null]
        //             }
        //         }
        //     },
        // },

        type: Map,
        of: {
            percentFull: {
                type: [Number],
                required: true,
                default: [null, null, null, null]
            }
        },
        required: true,
        default: () => ({
            Monday: { percentFull: [null, null, null, null] },
            Tuesday: { percentFull: [null, null, null, null] },
            Wednesday: { percentFull: [null, null, null, null] },
            Thursday: { percentFull: [null, null, null, null] },
            Friday: { percentFull: [null, null, null, null] },
        })
    }
}, {
    query: {
        byType(type) {
          return this.where({ lotType: new RegExp(type, 'i') });
        },
    }
});


module.exports = mongoose.model('Parking', dataSchema, 'parking')