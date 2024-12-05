const express = require('express')

const {
    getExistentAccesibilities
} = require('../controllers/accesibilities.controllers')

const router = express.Router()

router.get('/activities/accesibilities', getExistentAccesibilities)

module.exports = router