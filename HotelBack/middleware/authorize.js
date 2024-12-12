// middleware/authorize.js

// import { findById } from '../models/PersonasModel';
// import Role from '../models/RolesModel';
// import Permission from '../models/permisosModel';

const authorizeRole = (roleName) => async (req, res, next) => {
  const user = await findById(req.user.id).populate('roles');
  if (!user) return res.status(404).json({ message: 'User not found' });

  const role = user.roles.find(r => r.name === roleName);
  if (!role) return res.status(403).json({ message: 'Access denied' });

  next();
};

const authorizePermission = (permissionName) => async (req, res, next) => {
  const user = await findById(req.user.id).populate('permissions');
  if (!user) return res.status(404).json({ message: 'User not found' });

  const permission = user.permissions.find(p => p.name === permissionName);
  if (!permission) return res.status(403).json({ message: 'Access denied' });

  next();
};

export default {
  authorizeRole,
  authorizePermission
};
