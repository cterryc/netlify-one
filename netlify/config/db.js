import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config()
const { PORT_DB, USER_DB, PASS_DB, NAME_DB } = process.env

// --- CAMBIO CLAVE 1: GESTIÓN DE LA CONEXIÓN A LA BD ---
// Instanciamos Sequelize en el scope global del módulo.
const DATA_BASE = new Sequelize(
  `postgres://${USER_DB}:${PASS_DB}@${PORT_DB}/${NAME_DB}`,
  {
    logging: false,
    dialect: 'postgres',
    pool: {
      max: 2,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)

export default DATA_BASE
