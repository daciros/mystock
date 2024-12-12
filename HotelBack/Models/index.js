import {sequelize} from '../config/Database.config.js';
// Importar modelos
import definePersona from './PersonasModel.js';
import defineRoles from './RolesModel.js';
import definePermisos from './PermisosModel.js';
import defineSedes from './SedesModel.js';
import defineHabitaciones from './HabitacionesModel.js';
import defineReservas from './ReservasModel.js';
import defineServicios from './ServiciosModel.js';


// Definir modelos

  export const Persona = definePersona(sequelize);
  export const Roles = defineRoles(sequelize);
  export const Permisos = definePermisos(sequelize);
  export const Sedes = defineSedes(sequelize);
  export const Habitaciones = defineHabitaciones(sequelize);
  export const Reservas = defineReservas(sequelize);
  export const Servicios = defineServicios(sequelize);


// Relaciones entre modelos
Roles.hasMany(Persona, { foreignKey: 'rol_id' });
Persona.belongsTo(Roles, { foreignKey: 'rol_id' });

Roles.belongsToMany(Permisos, { through: 'RolPermisos' });
Permisos.belongsToMany(Roles, { through: 'RolPermisos' });

Sedes.hasMany(Habitaciones, { foreignKey: 'sede_id' });
Habitaciones.belongsTo(Sedes, { foreignKey: 'sede_id' });

Habitaciones.hasMany(Reservas, { foreignKey: 'habitacion_id' });
Reservas.belongsTo(Habitaciones, { foreignKey: 'habitacion_id' });

Persona.hasMany(Reservas, { foreignKey: 'persona_id' });
Reservas.belongsTo(Persona, { foreignKey: 'persona_id' });

Sedes.belongsToMany(Servicios, { through: 'SedeServicios' });
Servicios.belongsToMany(Sedes, { through: 'SedeServicios' });


