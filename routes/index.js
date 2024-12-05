module.exports = app => {

    const authRoutes = require('./auth.routes')
    app.use("/api", authRoutes)

    const categoriesRoutes = require('./categories.routes')
    app.use('/api', categoriesRoutes)

    const targetsRoutes = require('./target.routes')
    app.use('/api', targetsRoutes)

    const accesibilitiesRoutes = require('./accesibilities.routes')
    app.use('/api', accesibilitiesRoutes)

    const activitiesRoutes = require('./activities.routes')
    app.use('/api', activitiesRoutes)

    const reviewRoutes = require('./reviews.routes')
    app.use("/api", reviewRoutes)

}



