const { allowedAccesibilities } = require('../consts/allowed.consts')
const Activity = require('../models/Activity.model')
const mongoose = require('mongoose')

const getExistentAccesibilities = (req, res, next) => {

    Activity.distinct('accesibility')
        .then(accesibility => res.json(accesibility))
        .catch(err => next(err))

}

const getAllowedAccesibilities = (req, res, next) => {
    res.json(allowedAccesibilities)
}

module.exports = { getExistentAccesibilities, getAllowedAccesibilities }