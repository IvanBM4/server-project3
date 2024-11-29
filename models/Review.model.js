const { Schema, model } = require("mongoose")

const reviewSchema = new Schema({
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    },

    authorName: {
        type: String,
        required: true,
        ref: "User"

    },

    authorAvatar: {
        type: String,
        default: "https/example.com/default.authoravatar.pnj",
        ref: 'User'
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },

    description: {
        type: String,
        required: true,
        trim: true,
        maxlenght: 100

    },

    date: {
        type: Date

    },

    contact: {
        type: String,
        ref: "User"

    }
},
    {
        timestamps: true
    })

module.exports = model('Review', reviewSchema)