// Usamos los imports de ES Modules que ya tenías
import serverless from 'serverless-http'
import DATA_BASE from '../config/db.js'
import SERVER from '../config/server.js'

// Función para conectar y sincronizar la base de datos
const connectToDatabase = async () => {
  try {
    await DATA_BASE.authenticate()
    console.log('Connection has been established successfully.')

    // Sincronizar el modelo (crear la tabla si no existe)
    // En producción, es mejor usar migraciones
    await DATA_BASE.sync({ alter: true }) // alter: true actualiza la tabla sin borrar datos
    console.log('Database synchronized successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

// Conectar a la base de datos antes de exportar
connectToDatabase()

// Configuración específica para Netlify Functions
const netlifyHandler = serverless(SERVER, {
  binary: false // Importante: forzar que no trate el JSON como binario
})

// Wrapper para manejar el parsing del body en Netlify
export const handler = async (event, context) => {
  // Debug: ver qué llega desde Netlify
  console.log('Netlify event body:', event.body)
  console.log('Netlify event isBase64Encoded:', event.isBase64Encoded)

  // Si el body viene como string, asegurarse de que esté bien formateado
  if (event.body && typeof event.body === 'string') {
    try {
      // Verificar si es JSON válido
      JSON.parse(event.body)
    } catch (error) {
      console.log('Error cath:', error)
      console.log('Body no es JSON válido:', event.body)
    }
  }

  return netlifyHandler(event, context)
}
