const { Schema, model } = require('mongoose')

const reviewSchema = new Schema({

    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
    },

    rating: {
        type: Number,
        required: true,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must be 10 for maximum']
    },

    description: {
        type: String,
        required: true,
        trim: true,
        maxlenght: [100, 'Description must be 100 characters for maximum']
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    })

module.exports = model('Review', reviewSchema)