module.exports = app => {
    const authRoutes = require("./auth.routes")
    const reviewRoutes = require('./reviews.routes')
    app.use("/api", authRoutes, reviewRoutes)
}

