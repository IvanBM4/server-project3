const express = require('express')

const {
    getExistentTargets
} = require('../controllers/target.controllers')

const router = express.Router()

router.get('/activities/targets', getExistentTargets)

module.exports = router