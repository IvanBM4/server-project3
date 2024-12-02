const Activity = require('../models/Activity.model')
const mongoose = require('mongoose')

const getActivities = (req, res, next) => {

    Activity
        .find()
        .then(activities => res.json(activities))
        .catch(err => next(err))

}

const filterActivities = (req, res, next) => {

    Activity
        .find(req.query)
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

const getActivitiesByUser = (req, res, next) => {

    const { id: host } = req.params

    if (!mongoose.Types.ObjectId.isValid(host)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Activity
        .find({ host })
        .then(activities => res.json(activities))
        .catch(err => next(err))
}

const saveActivity = (req, res, next) => {

    const {
        name,
        description,
        date,
        cover,
        duration,
        categories,
        price,
        available,
        target,
        accesibility,
        address: { city, street, zipcode, longitude, latitude }
    } = req.body

    const location = {
        type: 'Point',
        coords: [longitude, latitude]
    }

    const { _id: host } = req.payload

    Activity
        .create({
            name,
            description,
            cover,
            date,
            duration,
            categories,
            price,
            available,
            target,
            accesibility,
            address: { city, street, zipcode, location },
            host
        })
        .then(activities => res.status(201).json(activities))
        .catch(err => next(err))
}

const editActivity = (req, res, next) => {

    const {
        name,
        description,
        cover,
        date,
        duration,
        categories,
        price,
        available,
        target,
        accesibility,
        address: { city, street, zipcode, location: { type, coords } }
    } = req.body

    const { id: activityId } = req.params

    if (!mongoose.Types.ObjectId.isValid(activityId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Activity
        .findByIdAndUpdate(activityId,
            {
                name,
                description,
                date,
                cover,
                duration,
                categories,
                price,
                available,
                target,
                accesibility,
                address: { city, street, zipcode, location: { type, coords } }
            },
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
    removeActivity,
    filterActivities,
    getActivitiesByUser
}