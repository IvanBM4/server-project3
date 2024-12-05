const Review = require('../models/Review.model')
const Activity = require('../models/Activity.model')
const User = require('../models/User.model')
const mongoose = require('mongoose')

const getReviews = (req, res, next) => {

    Review
        .find()
        .select({
            activity: 1,
            description: 1,
            rating: 1,
            author: 1
        })
        .then(reviews => res.json(reviews))
        .catch(err => next(err))
}

const getOneReview = (req, res, next) => {

    const { id: reviewId } = req.params

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Review
        .findById(reviewId)
        .select({
            activity: 1,
            description: 1,
            rating: 1,
            author: 1
        })
        .populate('activity user')
        .then(review => res.json(review))
        .catch(err => next(err))
}

const createReview = (req, res, next) => {

    const {
        activity,
        rating,
        description,
        author
    } = req.body

    Review
        .create({
            activity,
            rating,
            description,
            author
        })
        .then(review => res.status(201).json(review))
        .catch(err => next(err))

}

const editReview = (req, res, next) => {

    const { id: reviewId } = req.params
    const {
        activity,
        rating,
        description,
        author
    } = req.body

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Review
        .findByIdAndUpdate(
            reviewId,
            {
                activity,
                rating,
                description,
                author
            },
            {
                runValidators: true,
                new: true
            }
        )
        .then(reviews => res.json(reviews))
        .catch(err => next(err))
}

const getReviewByActivity = (req, res, next) => {

    const { id: activity } = req.params

    if (!mongoose.Types.ObjectId.isValid(activity)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Review
        .find({ activity })
        .populate('Activity')
        .then(reviews => res.json(reviews))
        .catch(err => next(err))
}

const getReviewByUser = (req, res, next) => {

    const { id: author } = req.params

    if (!mongoose.Types.ObjectId.isValid(author)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Review
        .find({ author })
        .populate('User')
        .then(reviews => res.json(reviews))
        .catch(err => next(err))
}

const deleteReview = (req, res, next) => {

    const { id: reviewId } = req.params

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Review
        .findByIdAndDelete(reviewId)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const filterReviews = (req, res, next) => {

    const buildQuery = (filters) => {

        let query = {}

        if (filters.startDate || filters.endDate) query.createdAt = {}
        if (filters.rating) query.rating = {}
        if (filters.startDate) query.createdAt.$gte = new Date(filters.startDate)

        if (filters.endDate) {
            const endDate = new Date(filters.endDate);
            endDate.setHours(23, 59, 59, 999);
            query.createdAt.$lte = endDate;
        }

        if (filters.rating) query.rating.$gte = parseInt(filters.rating)

        return query
    }

    const query = buildQuery(req.query)

    Review
        .find(query)
        .sort({ createdAt: -1 })
        .then(reviews => res.json(reviews))
        .catch(err => next(err))
}


module.exports = {
    getReviews,
    getOneReview,
    createReview,
    editReview,
    deleteReview,
    getReviewByActivity,
    filterReviews,
    getReviewByUser
}