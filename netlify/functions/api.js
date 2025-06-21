// netlify/functions/api.js
const express = require("express");
const serverless = require("serverless-http");

// Creamos la aplicación de Express
const app = express();

// Definimos el router
const router = express.Router();
router.get("/saludo", (req, res) => {
  res.json({ message: "¡Hola desde mi API de Express en Netlify!" });
});

// Usamos el router en la ruta base de la API
// Todas las rutas que definas en el router comenzarán con /api/
app.use("/api/", router);

// Exportamos el manejador (handler) para Netlify
// Esto envuelve nuestra app de Express para que sea compatible con Functions
module.exports.handler = serverless(app);
