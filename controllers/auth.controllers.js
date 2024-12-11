const User = require('../models/User.model')
const Activity = require('../models/Activity.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRounds = 10

const signupUser = (req, res, next) => {

    const { username, email, password, avatar } = req.body

    if (email === '' || password === '' || username === '') {
        next(new Error('Provide email, password and username'))
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

    if (!emailRegex.test(email)) {
        next(new Error('Provide password and username'))
        return
    }

    if (password.length < 3) {
        next(new Error('Password must have at least 4 characters'))
        return
    }

    User
        .findOne({ email })
        .then(user => {
            if (user) {
                next(new Error('usuario ya encontrado'))
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ username, email, avatar, password: hashedPassword })
        })

        .then(newUser => res.status(201).json(newUser))
        .catch(err => next(err))

}

const loginUser = (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: 'Email and password are required' })
        return
    }

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                next(new Error("User not found"))
                return
            }

            const isCorrectPass = bcrypt.compareSync(password, user.password)

            if (!isCorrectPass) {
                res.status(401).json('Incorrect password')
            }

            const { _id, email, username, role } = user
            const payLoad = { _id, email, username, role }
            const authToken = jwt.sign(
                payLoad,
                process.env.TOKEN_SECRET,
                {
                    algorithm: 'HS256', expiresIn: '6h'
                })
            res.json({ authToken })
        }

        )

}

const verifyUser = (req, res, next) => {

    res.json(req.payload)

}

const getUsers = (req, res, next) => {

    User
        .find()
        .select({
            username: 1,
            avatar: 1,
            likedActivities: 1,
            email: 1
        })
        .then(users => res.json(users))
        .catch(err => next(err))

}

const getOneUser = (req, res, next) => {
    const { id: userId } = req.params
    User
        .findById(userId)
        .select({
            username: 1,
            avatar: 1,
            likedActivities: 1,
            email: 1
        })
        .populate('likedActivities')
        .then(user => res.json(user))
        .catch(err => next(err))
}

module.exports = {
    signupUser,
    loginUser,
    verifyUser,
    getUsers,
    getOneUser
}