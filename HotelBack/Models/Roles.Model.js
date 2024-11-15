const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Roles = sequelize.define('Roles', {
    nombre: { type: DataTypes.STRING, allowNull: false },
  });

  return Roles;
};