const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Persona = sequelize.define('Persona', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    telefono: { type: DataTypes.STRING },
    direccion: { type: DataTypes.STRING },
  });

  return Persona;
};