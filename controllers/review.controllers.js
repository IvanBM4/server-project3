const Review = require('../models/Review.model')
const mongoose = require('mongoose')

const getReviews = (req, res, next) => {

    Review
        .find()
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
        .then(reviews => res.status(201).json(reviews))
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
    Review
        .find(req.query)
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