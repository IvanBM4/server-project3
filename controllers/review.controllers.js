const Review = require('../models/Review.model')
const mongoose = require('mongoose')

const getReviews = (req, res, next) => {

    Review
        .find()
        .select({ activity: 1, author: 1 })
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

    const { id: activityId } = req.params

    if (!mongoose.Types.ObjectId.isValid(activityId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Review
        .find(activityId)
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

module.exports = {
    getReviews,
    getOneReview,
    createReview,
    editReview,
    deleteReview,
    getReviewByActivity
}