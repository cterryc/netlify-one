export const handleBody = (req, res, next) => {
  // Solo procesar el body en métodos que lo requieren
  const methodsWithBody = ['POST', 'PUT', 'PATCH']

  if (methodsWithBody.includes(req.method) && Buffer.isBuffer(req.body)) {
    try {
      const bodyString = req.body.toString('utf8')
      console.log('Body como string:', bodyString)

      // Solo parsear si hay contenido
      if (bodyString.trim()) {
        req.body = JSON.parse(bodyString)
        console.log('Body parseado exitosamente:', req.body)
      } else {
        req.body = {}
      }
    } catch (error) {
      console.error('Error parseando body:', error)
      return res.status(400).json({
        error: 'Formato de datos inválido',
        details: 'No se pudo parsear el JSON'
      })
    }
  } else if (methodsWithBody.includes(req.method) && !req.body) {
    // Para métodos con body pero sin contenido
    req.body = {}
  }

  next()
}
