const { Router } = require('express')
const authMiddleware = require('../middlewares/auth')
const user_controller = require('../controllers/userController')
const router = Router()

router.post('/register', user_controller.register_user)

router.post('/login', user_controller.login_user)

router.post('/validate', user_controller.validate_user)

router.post('/profile', authMiddleware, user_controller.update_profile)

router.get('/profile', authMiddleware, user_controller.get_profile)

module.exports = router
