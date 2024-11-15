const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Servicios = sequelize.define('Servicios', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
  });

  return Servicios;
};