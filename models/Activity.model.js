const { Schema, model } = require("mongoose")

const activitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        minlength: [10, 'la descripcion debe de tener minimo de 10 caracteres'],
        trim: true
    },
    date: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = model('Activity', activitySchema)