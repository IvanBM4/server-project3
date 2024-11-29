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

    image: {
        type: String,
        required: true,
        trim: true
    },

    categories: {
        type: Array
    },

    adress: {
        city: {
            type: String
        },
        street: {
            type: String
        },
        zipcode: {
            type: Number
        },
        lat: {
            type: Number
        },
        lang: {
            type: Number
        }
    },

    target: {
        type: Array
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

    contact: {
        type: String,
        required: true,
        ref: 'User'
    },

    available: {
        type: Boolean,
        required: true
    },

    accesibility: {
        type: Array
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    })

module.exports = model('Activity', activitySchema)