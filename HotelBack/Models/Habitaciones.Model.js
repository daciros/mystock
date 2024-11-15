const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Habitaciones = sequelize.define('Habitaciones', {
    numero: { type: DataTypes.STRING, allowNull: false },
    tamano: { type: DataTypes.FLOAT, allowNull: false },
    cantidad_camas: { type: DataTypes.INTEGER, allowNull: false },
    precio_por_noche: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    descripcion: { type: DataTypes.TEXT },
  });

  return Habitaciones;
};