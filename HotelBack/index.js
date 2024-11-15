require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./Models'); // Importar conexión y modelos
const routes = require('./routes'); // Importar las rutas (lo crearemos después)

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON en el body

// Rutas principales
app.use('/api', routes);

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