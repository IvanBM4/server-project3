const Activity = require("../models/Activity.model")
const mongoose = require('mongoose')

const getActivities = (req, res, next) => {
    Activity
        .find()
        .select({ name: 1, owner: 1 })
        .then(activities => res.json(activities))
        .catch(err => next(err))
}

const getOneActivity = (req, res, next) => {
    const { id: activityId } = req.params
    if (!mongoose.Types.ObjectId.isValid(activityId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }
    Activity
        .findById(activityId)
        .then(activities => res.json(activities))
        .catch(err => next(err))
}

const saveActivity = (req, res, next) => {
    const { name, description, date, duration } = req.body
    Activity
        .create({ name, description, date, duration })
        .then(activities => res.status(201).json(activities))
        .catch(err => next(err))
}

const editActivity = (req, res, next) => {
    const { name, description, date, duration } = req.body
    const { id: activityId } = req.params
    if (!mongoose.Types.ObjectId.isValid(activityId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }
    Activity
        .findByIdAndUpdate(activityId,
            { name, description, date, duration },
            {
                runValidators: true,
                new: true
            }
        )
        .then(activities => res.json(activities))
        .catch(err => next(err))
}

const removeActivity = (req, res, next) => {
    const { id: activityId } = req.params
    if (!mongoose.Types.ObjectId.isValid(activityId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }
    Activity
        .findByIdAndDelete(activityId)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

module.exports = {
    getActivities,
    getOneActivity,
    saveActivity,
    editActivity,
    removeActivity
}