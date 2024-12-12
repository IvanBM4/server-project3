const Message = require('../models/Message.model')
const User = require('../models/User.model')
const mongoose = require('mongoose')

const sendMessage = (req, res, next) => {

    const { _id: sender } = req.payload

    const {
        receiver,
        content
    } = req.body

    Message
        .create({
            sender,
            receiver,
            content
        })
        .then(message => res.status(201).json(message))
        .catch(err => next(err))
}

const fetchReceiverMessages = (req, res, next) => {

    const { id: receiver } = req.params

    if (!mongoose.Types.ObjectId.isValid(receiver)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Message
        .find({ receiver })
        .populate('sender', 'username avatar')
        .then(messages => res.json(messages))
        .catch(err => next(err))

}

module.exports = {
    fetchReceiverMessages,
    sendMessage
}