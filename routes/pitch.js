const router = require('express').Router()
const apiController = require('../controllers/API/apiController')

// get all slider
router.get('/recommended',apiController.recommended)
router.get('/directory', apiController.directory)

// get slider by id
router.get('/pitch/:id', apiController.detailPitch)


module.exports = router  