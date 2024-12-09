const uploaderMiddleware = require('../middleware/uploader.middleware')

const router = require('express').Router()

router.post('/image', uploaderMiddleware.single('imageData'), (req, res) => {

    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error caragndo el archivo' })
        return
    }

    res.json({ cloudinary_url: req.file.path })
})


module.exports = router

module.exports = router