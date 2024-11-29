const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const saltRounds = 10

const signupUser = (req, res, next) => {

    const { userName, email, password } = req.body

    if (email === '' || password === '' || userName === '') {
        next("Provide email, password and username")
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        next("Provide password and username")
        return
    }

    if (password.length < 3) {
        next("Password must have at least 4 characters")
        return
    }

    // para terminar 

    User
        .findOne({ email })
        .then(user => {
            if (user) {
                next(new Error("usuario ya encontrado"))
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ userName, email, password: hashedPassword })
        })

        .then(newUser => res.status(201).json(newUser))
        .catch(err => next(err))

}

module.exports = {
    signupUser
}