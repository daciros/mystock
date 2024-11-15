const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Permisos = sequelize.define('Permisos', {
    nombre: { type: DataTypes.STRING, allowNull: false },
  });

  return Permisos;
};