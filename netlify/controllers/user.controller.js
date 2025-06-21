import User from '../models/user.model.js'

export const saludo = (req, res) => {
  res.json({ message: '¡Hola desde mi API de Express en Netlify con BD!' })
}

export const newUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body

    // Validar que todos los campos estén presentes
    if (!name || !email || !phone) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos: name, email, phone',
        received: { name, email, phone },
        bodyType: typeof req.body
      })
    }

    // Crear el usuario
    const newUser = await User.create({
      name,
      email,
      phone
    })

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      userRouter: newUser
    })
  } catch (error) {
    console.error('Error al crear usuario:', error)

    // Manejar error de email duplicado
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'El email ya está registrado'
      })
    }

    // Manejar errores de validación
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: error.errors.map((err) => err.message)
      })
    }

    res.status(500).json({
      error: 'Error interno del servidor al crear el usuario'
    })
  }
}

export const allUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'phone', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']] // Ordenar por fecha de creación, más recientes primero
    })

    res.json({
      message: 'Usuarios obtenidos exitosamente',
      count: users.length,
      users
    })
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).json({
      error: 'Error interno del servidor al obtener los usuarios'
    })
  }
}
