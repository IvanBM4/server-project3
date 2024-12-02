const verifyToken = require('../middleware/verifyToken')
const express = require('express')
const {

    getReviews,
    getOneReview,
    createReview,
    editReview,
    deleteReview,
    filterReviews,
    getReviewByActivity,
    getReviewByUser

} = require('../controllers/review.controllers')
const verifyToken = require('../middleware/verifyToken')

const router = express.Router()

router.get('/reviews/search', filterReviews)

router.get('/reviews', getReviews)

router.get('/reviews/:id', getOneReview)

router.post('/reviews', verifyToken, createReview)

router.put('/reviews/:id', editReview,)

router.delete('/reviews/:id', deleteReview)

router.get("/reviews/activities/:id", getReviewByActivity)

router.get("/reviews/users/:id", getReviewByUser)


module.exports = router