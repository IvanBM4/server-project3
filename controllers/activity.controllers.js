const Activity = require('../models/Activity.model')
const User = require('../models/User.model')
const mongoose = require('mongoose')

const getActivities = (req, res, next) => {

    Activity
        .find()
        .select({
            name: 1,
            cover: 1,
            description: 1,
            host: 1,
            date: 1,
            categories: 1,
            target: 1,
            accesibility: 1,
            address: 1,
            price: 1,
            duration: 1,
            createdAt: 1
        })
        .sort({ createdAt: -1 })
        .then(activities => res.json(activities))
        .catch(err => next(err))
}

const filterActivities = (req, res, next) => {

    const buildQuery = (filters) => {
        let query = {}

        if (filters.name) query.name = new RegExp(filters.name, 'i')
        if (filters.price) query.price = { $gte: parseInt(filters.price) }

        if (filters.startDate || filters.endDate) {
            query.createdAt = {}
            if (filters.startDate) query.createdAt.$gte = new Date(filters.startDate)
            if (filters.endDate) query.createdAt.$lte = new Date(filters.endDate).setHours(23, 59, 59, 999)
        }
        return query
    }

    const query = buildQuery(req.query)

    Activity
        .find(query)
        .sort({ createdAt: -1 })
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
        .select({
            name: 1,
            cover: 1,
            description: 1,
            host: 1,
            date: 1,
            categories: 1,
            target: 1,
            accesibility: 1,
            address: 1,
            price: 1,
            duration: 1,
            createdAt: 1
        })
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
        .populate('host')
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
        .then(activity => res.status(201).json(activity))
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
        address: { city, street, zipcode, longitude, latitude }
    } = req.body

    const location = {
        type: 'Point',
        coords: [longitude, latitude]
    }

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
                address: { city, street, zipcode, location }
            },
            {
                runValidators: true,
                new: true
            }
        )
        .then(activity => res.json(activity))
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