
const express = require("express")
const {

    getReviews,
    getOneReview,
    createReview,
    editReview,
    deleteReview


} = require("../controllers/review.controllers")

const router = express.Router()

router.get("/reviews", getReviews)

router.get("/reviews/:id", getOneReview)

router.post("/reviews", createReview)

router.put("/reviews/:id", editReview)

router.delete("/reviews/:id", deleteReview)


module.exports = router