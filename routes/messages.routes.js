const verifyToken = require('../middleware/verifyToken')
const express = require('express')

const {
    fetchReceiverMessages,
    sendMessage
} = require('../controllers/message.controllers')

const router = express.Router()

router.post('/messages', verifyToken, sendMessage)

router.get('/messages/users/:id', fetchReceiverMessages)

module.exports = router