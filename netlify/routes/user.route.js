import { Router } from 'express'
import { saludo, newUser, allUsers } from '../controllers/user.controller.js'

const userRouter = Router()

// --- RUTAS EXISTENTES ---
userRouter.get('/saludo', saludo)
userRouter.post('/newUser', newUser)

// GET /api/allUsers - Obtener todos los usuarios
userRouter.get('/allUsers', allUsers)

export default userRouter
