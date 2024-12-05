const express = require('express')

const {
    getExistentCategories,
    getAllowedCategories
} = require('../controllers/category.controllers')

const router = express.Router()

router.get('/activities/categories', getExistentCategories)

router.get('/categories-allowed', getAllowedCategories)

module.exports = router

