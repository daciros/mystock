// Paso 1: Configuración inicial del backend

// 1. Crear la carpeta del proyecto y ejecutar `npm init`
//    mkdir hotel-booking-backend && cd hotel-booking-backend && npm init -y

// 2. Instalar las dependencias principales
//    npm install express sequelize mysql2 mongodb firebase-admin tedious nodemon jsonwebtoken dotenv bcryptjs fs

// 3. Crear la estructura básica del proyecto:
//    hotel-booking-backend/
//    |-- config/
//    |-- controllers/
//    |-- models/
//    |-- routes/
//    |-- utils/
//    |-- adapters/
//    |-- app.js
//    |-- package.json

// app.js
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const mongoConnect = require('./config/mongo');
const firebaseAdmin = require('./config/firebase');
const sqlServerConnect = require('./config/sqlserver');
const userRoutes = require('./routes/userRoutes'); // Ruta de ejemplo
const reservationRoutes = require('./routes/reservationRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const branchRoutes = require('./routes/branchRoutes');
const fs = require('fs');
const path = require('path');
const databaseAdapter = require('./adapters/databaseAdapter');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/branches', branchRoutes);

// Configuración de archivo JSON local para datos de respaldo
const backupFilePath = path.join(__dirname, 'data/backup.json');

if (!fs.existsSync(backupFilePath)) {
  fs.writeFileSync(backupFilePath, JSON.stringify([]));
}

// Inicializar la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión con MySQL establecida.');
  } catch (error) {
    console.error('Error al conectar con MySQL:', error);
  }

  try {
    await mongoConnect();
    console.log('Conexión con MongoDB establecida.');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
  }

  try {
    await sqlServerConnect();
    console.log('Conexión con SQL Server establecida.');
  } catch (error) {
    console.error('Error al conectar con SQL Server:', error);
  }

  try {
    if (firebaseAdmin) {
      console.log('Firebase conectado.');
    }
  } catch (error) {
    console.error('Error al conectar con Firebase:', error);
  }

  databaseAdapter.setDatabase(process.env.DB_TYPE || 'json'); // Configurar base de datos activa

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
})();

// adapters/databaseAdapter.js
const sequelize = require('../config/database');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

/*const */ backupFilePath = path.join(__dirname, '../data/backup.json');

let activeDatabase = 'json';

const setDatabase = (dbType) => {
  activeDatabase = dbType;
};

const create = async (model, data) => {
  switch (activeDatabase) {
    case 'mysql':
    case 'sqlserver':
      return await model.create(data);
    case 'mongodb':
      const mongoModel = mongoose.model(model.name, model.schema);
      return await mongoModel.create(data);
    case 'firebase':
      const ref = admin.database().ref(model.name);
      const newRef = ref.push();
      await newRef.set(data);
      return { id: newRef.key, ...data };
    case 'json':
      const dataJSON = JSON.parse(fs.readFileSync(backupFilePath, 'utf8'));
      const newItem = { id: Date.now(), ...data };
      dataJSON.push(newItem);
      fs.writeFileSync(backupFilePath, JSON.stringify(dataJSON, null, 2));
      return newItem;
    default:
      throw new Error('Base de datos no soportada');
  }
};

const findAll = async (model) => {
  switch (activeDatabase) {
    case 'mysql':
    case 'sqlserver':
      return await model.findAll();
    case 'mongodb':
      const mongoModel = mongoose.model(model.name, model.schema);
      return await mongoModel.find();
    case 'firebase':
      const ref = admin.database().ref(model.name);
      const snapshot = await ref.once('value');
      return snapshot.val() ? Object.values(snapshot.val()) : [];
    case 'json':
      return JSON.parse(fs.readFileSync(backupFilePath, 'utf8'));
    default:
      throw new Error('Base de datos no soportada');
  }
};

// Otras funciones CRUD como update y delete seguirían un patrón similar

module.exports = { setDatabase, create, findAll };

// models/User.js
const { DataTypes } = require('sequelize');
const mongoose = require('mongoose');

// Modelo Sequelize para MySQL/SQL Server
const sequelizeModel = (sequelize) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

// Modelo Mongoose para MongoDB
const mongoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Estructura para Firebase y JSON
const plainModel = {
  name: '',
  email: '',
  password: '',
  role: '',
};

module.exports = { sequelizeModel, mongoSchema, plainModel };

// models/Role.js
const sequelizeRoleModel = (sequelize) => {
  return sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

const mongoRoleSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const plainRoleModel = {
  name: '',
};

module.exports = { sequelizeRoleModel, mongoRoleSchema, plainRoleModel };

// models/Hotel.js
const sequelizeHotelModel = (sequelize) => {
  return sequelize.define('Hotel', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

const mongoHotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
});

const plainHotelModel = {
  name: '',
  location: '',
};

module.exports = { sequelizeHotelModel, mongoHotelSchema, plainHotelModel };

// models/Branch.js
const sequelizeBranchModel = (sequelize) => {
  return sequelize.define('Branch', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hotelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

const mongoBranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
});

const plainBranchModel = {
  name: '',
  city: '',
  hotelId: '',
};

module.exports = { sequelizeBranchModel, mongoBranchSchema, plainBranchModel };

// models/Room.js
const sequelizeRoomModel = (sequelize) => {
  return sequelize.define('Room', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

}
const mongoRoomSchema = new mongoose.Schema({
    number: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
});

const plainRoomModel = {
    number: '',
    type: '',
    price: 0,
    branchId: '',
};

module.exports = {sequelizeRoomModel, ...mongoRoomSchema, plainRoomModel }; 