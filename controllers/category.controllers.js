const { allowedCategories } = require('../consts/allowed.consts')
const Activity = require('../models/Activity.model')
const mongoose = require('mongoose')

const getExistentCategories = (req, res, next) => {

    Activity.distinct('categories')
        .then(categories => res.json(categories))
        .catch(err => next(err))

}

const getAllowedCategories = (req, res, next) => {

    res.json(allowedCategories)

}

module.exports = {
    getExistentCategories,
    getAllowedCategories
}