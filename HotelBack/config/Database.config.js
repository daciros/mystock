import mongoose from "mongoose";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Construir la URI de conexión
const { MONGO_URI, MONGO_USER, MONGO_PASSWORD, MONGO_DB } = process.env;
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } =
  process.env;

const uri =
  MONGO_URI ||
  `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:27017/${MONGO_DB}?authSource=admin`;

// Configuración de Sequelize

export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

// Configurar opciones adicionales
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Función para conectar a la base de datos
export const connectDBToMySQL = async () => {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      port: MYSQL_PORT,
    });
    console.log("Conexión exitosa a MySQL");
    return connection;
  } catch (error) {
    console.error("Error al conectar a MySQL:", error.message);
    process.exit(1); // Salir del proceso si hay un error crítico
  }
};

export const connectDBToMongoDB = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1); // Salir del proceso si hay un error crítico
  }
};
