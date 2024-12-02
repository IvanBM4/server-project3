const verifyToken = require('../middleware/verifyToken')
const express = require('express')
const {

    getReviews,
    getOneReview,
    createReview,
    editReview,
    deleteReview,
    filterReviews,
    getReviewByActivity


} = require('../controllers/review.controllers')

const router = express.Router()

router.get('/reviews/search', filterReviews)

router.get('/reviews', getReviews)

router.get('/reviews/:id', getOneReview)

router.post('/reviews', createReview)

router.put('/reviews/:id', editReview,)

router.delete('/reviews/:id', deleteReview)

router.get("/reviews/activities/:id", getReviewByActivity)

module.exports = router