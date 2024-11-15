const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Sedes = sequelize.define('Sedes', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false },
    ciudad: { type: DataTypes.STRING, allowNull: false },
    pais: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.TEXT },
  });

  return Sedes;
};