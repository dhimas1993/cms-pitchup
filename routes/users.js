const router = require('express').Router()
const multer = require('multer')
const usersController = require('../controllers/API/usersController')
const {
    uploadUser,
    uploadPitchdeck
} = require('../middleware/multer')

// Login
router.post('/login',usersController.login)

// getuser by id
router.get('/users/:id',usersController.detailUser)

//confim signup email
router.post('/register/:token', usersController.confirmasiEmail)

// register
router.post('/register', usersController.register)
router.put('/registerStartup',uploadUser, usersController.registerStartup)
router.put('/registerStartupCategory', usersController.registerCategory)
router.put('/registerLocated', usersController.registerLocated)
router.put('/registerStage', usersController.registerStage)
router.put('/registerUpload',uploadPitchdeck, usersController.registerUpload)
router.put('/yourProfile', usersController.yourProfile)
router.put('/hearAboutUs', usersController.hearAboutUs)
router.put('/packagePlan', usersController.packagePlan)
router.post('/uploadPitchdeck',uploadPitchdeck, usersController.uploadPitchdeck)
router.post('/uploadMockup',uploadPitchdeck, usersController.uploadMockup)
router.post('/pitchdeckByUserId', usersController.pitchdeckByUserId)
router.post('/getuser', usersController.getUser)
router.post('/submit_pitchdeck', usersController.submitPitchdeck)
router.put('/submit_terms', usersController.sumbitTerms)

router.put('/EditAccount',uploadUser, usersController.editAccount)
router.put('/EditPersonal', usersController.editPersonal)
router.put('/EditCompany',uploadUser, usersController.editCompany)


module.exports = router
