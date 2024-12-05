const Activity = require('../models/Activity.model')
const mongoose = require('mongoose')

const getExistentTargets = (req, res, next) => {

    Activity.distinct('target')
        .then(target => res.json(target))
        .catch(err => next(err))

}

module.exports = { getExistentTargets }