const { Schema, model } = require('mongoose')

const activitySchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        minlength: [10, 'Description must have at least 10 characters'],
        required: true,
        trim: true
    },

    cover: {
        type: String,
        required: true,
        trim: true
    },

    categories: {
        type: [String]
    },

    address: {
        city: {
            type: String
        },
        street: {
            type: String
        },
        zipcode: {
            type: Number
        },
        location: {
            type: {
                type: String
            },
            coords: [Number]
        }
    },

    target: {
        type: [String]
    },

    price: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    duration: {
        type: Number,
        required: true,
        minlength: [1, 'Duration must have at least 1 minute']
    },

    available: {
        type: Boolean,
        required: true
    },

    accesibility: {
        type: [String]
    },

    host: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    })

module.exports = model('Activity', activitySchema)