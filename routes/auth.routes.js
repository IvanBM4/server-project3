const { signupUser } = require("../controllers/auth.controllers")

const router = require("express").Router()

router.post("/signup", signupUser)

module.exports = router