const { Router } = require('express')
const authMiddleware = require('../middlewares/auth')
const todos_controller = require('../controllers/todosController')

const router = Router()

router.get('/', authMiddleware, todos_controller.getAll)
router.post('/create', authMiddleware, todos_controller.create)
router.post('/updateAll', authMiddleware, todos_controller.updateAll)
module.exports = router
