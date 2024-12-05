const express = require('express')

const {
    getExistentAccesibilities,
    getAllowedAccesibilities
} = require('../controllers/accesibilities.controllers')

const router = express.Router()

router.get('/activities/accesibilities', getExistentAccesibilities)

router.get('/accesibilities-allowed', getAllowedAccesibilities)

module.exports = router