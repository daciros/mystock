import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Permisos = sequelize.define('Permisos', {
    nombre: { type: DataTypes.STRING, allowNull: false }, //nombre del perfil asociado a los permisos
    reserva: { type: DataTypes.STRING, allowNull: false }, //pantalla para la gestion de reservas, agregar, editar y eliminar
    hoteles: { type: DataTypes.STRING, allowNull: false }, //pantalla para la gestion de hoteles, agregar, editar y eliminar
    sedes: { type: DataTypes.STRING, allowNull: false }, //pantalla para la gestion de sedes, agregar, editar y eliminar
    administracion: { type: DataTypes.STRING, allowNull: false }, //pantalla para la gestion de administracion, crud de operaciones para todos los elementos de la plataforma
    servicios: { type: DataTypes.STRING, allowNull: false }, //pantalla para la gestion de servicios, agregar, editar y eliminar servicios, como resturante, cafeteria, bar, picinas
    visualizacion: { type: DataTypes.STRING, allowNull: false}, //perfil de solo visualizacion de hoteles y sedes, navegacion principal sin iniciar sesion de usuario
  });
  //cada una de las pantallas sera validada a traves de un string S o N segun sea el caso de asignacion de perfiles, el perfil de usuario registrado tiene acceso a la visualizacion y reserva, el perfil de empleado tiene acceso a la visualizacion, hoteles y reservas, el perfil de administracion tiene acceso a la visualizacion, reservas, hoteles, sedes, servicios
  return Permisos;
};