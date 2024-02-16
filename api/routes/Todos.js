const { Router } = require('express')
const User = require('../models/User')
const authMiddleware = require('../middlewares/auth')
const todos_controller = require('../controllers/todosController')

const router = Router()

router.post('/todos/create', authMiddleware, todos_controller.create)
router.post('/todos/updateAll', authMiddleware, todos_controller.updateAll)
module.exports = router
