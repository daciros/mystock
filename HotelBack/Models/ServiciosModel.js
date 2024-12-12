// import { DataTypes } from 'sequelize';

import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Servicios = sequelize.define('Servicios', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
  });

  return Servicios;
};