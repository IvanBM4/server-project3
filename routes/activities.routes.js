const express = require('express')
const {
    getActivities,
    getOneActivity,
    saveActivity,
    editActivity,
    removeActivity,
    filterActivities,
    getActivitiesByUser,
    joinActivity,
    leaveActivity
} = require('../controllers/activity.controllers')
const verifyToken = require('../middleware/verifyToken')

const router = express.Router()

router.get('/activities/search', filterActivities)

router.get('/activities', getActivities)

router.post('/activities/:id/join', verifyToken, joinActivity)

router.post('/activities/:id/leave/', verifyToken, leaveActivity)

router.get('/activities/:id', getOneActivity)

router.get('/activities/users/:id', getActivitiesByUser)

router.post('/activities/', verifyToken, saveActivity)

router.put('/activities/:id', editActivity)


router.delete('/activities/:id', removeActivity)


module.exports = router