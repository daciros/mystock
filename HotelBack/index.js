import dotenv from "dotenv";
import express, { json } from 'express';
import cors from 'cors';
import { sequelize } from './config/Database.config.js'; // Importar conexión y modelos
import rutes from './Routes/index.js'; // Importar las rutas (lo crearemos después)

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3090;

// Middlewares
app.use(cors());
app.use(json()); // Para parsear JSON en el body

// Rutas principales
app.use('/api',  rutes);

// Sincronización con la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    return sequelize.sync(); // Sincroniza las tablas automáticamente (opcional: { force: true } para reiniciar la base de datos)
  })
  .then(() => {
    console.log('Base de datos sincronizada');
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });