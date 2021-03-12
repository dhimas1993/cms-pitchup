const router = require('express').Router()
const adminController = require('../controllers/admin/adminController')
const category_controller = require('../controllers/admin/category_controller')
const slider_controller = require('../controllers/admin/slider_controller')
const news_controller = require('../controllers/admin/news_controller')
const pitch_controller = require('../controllers/admin/pitch_controller')
const teams_controller = require('../controllers/admin/teams_controller')
const adminUser_controller = require('../controllers/admin/adminUser_controller')
const pitchdeck_controller = require('../controllers/admin/pitcdeck_controller')
const users_controller = require('../controllers/admin/users_controller')
const index_controller = require('../controllers/admin/index_controller')
const Auth = require('../middleware/auth.js')

const {
    uploadSlider, 
    uploadNews, 
    uploadPitch,
    uploadTeams
} = require('../middleware/multer')

router.get('/',index_controller.viewIndex)
router.post('/',index_controller.actionSignin)
router.use(Auth)
router.get('/logout', index_controller.actionLogout )
router.get('/dashboard', adminController.viewDashboard)

// CRUD SLIDER
router.get('/slider', slider_controller.viewSlider)
router.post('/slider',uploadSlider,slider_controller.addSlider)
router.put('/slider',uploadSlider,slider_controller.editSlider)
router.delete('/slider/:id',slider_controller.deleteSlider)

// CRUD NEWS
router.get('/news', news_controller.viewNews)
router.post('/news',uploadNews,news_controller.addNews)
router.put('/news',uploadNews,news_controller.editNews)
router.delete('/news/:id',news_controller.deleteNews)

// CRUD CATEGORY
router.get('/category', category_controller.viewCategory)
router.post('/category',category_controller.addCategory)
router.put('/category',category_controller.editCategory)
router.delete('/category/:id',category_controller.deleteCategory)

// CRUD PITCH
router.get('/pitch', pitch_controller.viewPitch)
router.post('/pitch',uploadPitch, pitch_controller.addPitch)
router.put('/pitch',uploadPitch,pitch_controller.editPitch)
router.delete('/pitch/:id',pitch_controller.deletePitch)

// TEAMS
router.get('/teams',teams_controller.viewTeams )
router.post('/teams',uploadTeams,teams_controller.addTeams )
router.put('/teams',uploadTeams,teams_controller.editTeams )
router.delete('/teams/:id',teams_controller.deleteTeams)

// ADMIN USER
router.get('/admin-user',adminUser_controller.viewAdmin )
router.post('/admin-user',adminUser_controller.addAdmin )
router.put('/admin-user',adminUser_controller.editAdmin )
router.delete('/admin-user/:id',adminUser_controller.deleteAdmin)

// USERS "startup"
router.get('/users', users_controller.viewUsers)

// PITCHDECK
router.get('/pitchdeck', pitchdeck_controller.viewPitchdeck)

module.exports = router