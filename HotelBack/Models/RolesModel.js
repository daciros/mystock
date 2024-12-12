// import { DataTypes } from 'sequelize';

import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Roles = sequelize.define('Roles', {
    nombre: { type: DataTypes.STRING, allowNull: false },
  });

  return Roles;
};