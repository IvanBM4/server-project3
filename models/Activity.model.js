const { Schema, model } = require('mongoose')
const { allowedCategories, allowedTargets, allowedAccesibilities } = require('../consts/allowed.consts')

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
        type: [String],
        enum: allowedCategories
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
        type: [String],
        enum: allowedTargets
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
        type: [String],
        enum: allowedAccesibilities
    },

    host: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    assistants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
    {
        timestamps: true
    })

activitySchema.index({ location: '2dsphere' })

module.exports = model('Activity', activitySchema)

