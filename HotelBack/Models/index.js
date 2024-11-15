const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const models = {
  Persona: require('./Personas.Model')(sequelize),
  Roles: require('./Roles.Model')(sequelize),
  Permisos: require('./Permisos.Model')(sequelize),
  Sedes: require('./Sedes.Model')(sequelize),
  Habitaciones: require('./Habitaciones.Model')(sequelize),
  Reservas: require('./Reservas.Model')(sequelize),
  Servicios: require('./Servicios.Model')(sequelize),
};

// Relaciones
models.Roles.hasMany(models.Persona, { foreignKey: 'rol_id' });
models.Persona.belongsTo(models.Roles, { foreignKey: 'rol_id' });

models.Roles.belongsToMany(models.Permisos, { through: 'RolPermisos' });
models.Permisos.belongsToMany(models.Roles, { through: 'RolPermisos' });

models.Sedes.hasMany(models.Habitaciones, { foreignKey: 'sede_id' });
models.Habitaciones.belongsTo(models.Sedes, { foreignKey: 'sede_id' });

models.Habitaciones.hasMany(models.Reservas, { foreignKey: 'habitacion_id' });
models.Reservas.belongsTo(models.Habitaciones, { foreignKey: 'habitacion_id' });

models.Persona.hasMany(models.Reservas, { foreignKey: 'persona_id' });
models.Reservas.belongsTo(models.Persona, { foreignKey: 'persona_id' });

models.Sedes.belongsToMany(models.Servicios, { through: 'SedeServicios' });
models.Servicios.belongsToMany(models.Sedes, { through: 'SedeServicios' });

module.exports = { sequelize, ...models };