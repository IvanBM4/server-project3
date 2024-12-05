const express = require('express')

const {
    getExistentTargets,
    getAllowedTargets
} = require('../controllers/target.controllers')

const router = express.Router()

router.get('/activities/targets', getExistentTargets)

router.get('/targets-allowed', getAllowedTargets)

module.exports = router