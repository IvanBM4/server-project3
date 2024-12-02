module.exports = app => {

    const authRoutes = require('./auth.routes')
    app.use("/api", authRoutes)

    const activitiesRoutes = require('./activities.routes')
    app.use('/api', activitiesRoutes)

    const reviewRoutes = require('./reviews.routes')
    app.use("/api", reviewRoutes)

}

