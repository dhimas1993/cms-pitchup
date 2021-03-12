const router = require('express').Router()
const apiController = require('../controllers/API/apiController')

// get all slider
router.get('/news',apiController.news)
router.get('/topvc', apiController.topvc)
router.get('/pitch', apiController.pitch)
router.get('/recommended', apiController.recommended)
router.get('/slider/file/:imageName',apiController.imageSlider)
router.get('/slider',apiController.dashboard)
router.get('/category', apiController.category)

module.exports = router  