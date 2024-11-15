const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Reservas = sequelize.define('Reservas', {
    fecha_inicio: { type: DataTypes.DATEONLY, allowNull: false },
    fecha_fin: { type: DataTypes.DATEONLY, allowNull: false },
    estado: {
      type: DataTypes.ENUM('activa', 'cancelada', 'finalizada'),
      defaultValue: 'activa',
    },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  });

  return Reservas;
};