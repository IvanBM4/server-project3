const { allowedTargets } = require('../consts/allowed.consts')
const Activity = require('../models/Activity.model')
const mongoose = require('mongoose')

const getExistentTargets = (req, res, next) => {

    Activity.distinct('target')
        .then(target => res.json(target))
        .catch(err => next(err))

}

const getAllowedTargets = (req, res, next) => {

    res.json(allowedTargets)

}

module.exports = { getExistentTargets, getAllowedTargets }