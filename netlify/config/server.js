import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRouter from '../routes/user.route.js'
import { handleBody } from '../middlewares/body.middleware.js'

const SERVER = express()

// Middlewares - Configuración específica para Netlify
SERVER.use(morgan('dev'))

// Middleware personalizado para manejar el body de Netlify
SERVER.use('/api', handleBody)

// Middleware para parsear JSON (después del middleware personalizado)
SERVER.use(
  express.json({
    limit: '50mb',
    type: ['application/json', 'text/plain']
  })
)

// Middleware para parsear form data
SERVER.use(
  express.urlencoded({
    extended: true,
    limit: '50mb'
  })
)

const corsOptions = {
  origin: '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Origin', 'Accept', 'X-Requested-With'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}
SERVER.use(cors(corsOptions))

// --- MONTAJE DEL ROUTER ---
SERVER.use('/api/', userRouter)

// Middleware de errores
SERVER.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || err
  console.error('Error middleware: ', message)
  res.status(status).send({ error: message })
})

export default SERVER
