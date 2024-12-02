const express = require('express')
const {
    getActivities,
    getOneActivity,
    saveActivity,
    editActivity,
    removeActivity,
    filterActivities
} = require('../controllers/activity.controllers')

const router = express.Router()

router.get('/activities/search', filterActivities)

router.get('/activities', getActivities)

router.get('/activities/:id', getOneActivity)

router.post('/activities/', saveActivity)

router.put('/activities/:id', editActivity)

router.delete('/activities/:id', removeActivity)


module.exports = router