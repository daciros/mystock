import { Permisos } from '../models/index.js';

const permisoController = {
  getAll: async (req, res) => {
    try {
      const permisos = await Permisos.findAll();
      res.status(200).json(permisos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener permisos' });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaPermisos = await Permisos.create(req.body);
      res.status(201).json(nuevaPermisos);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear permiso' });
    }
  },

  getById: async (req, res) => {
    try {
      const permiso = await Permisos.findByPk(req.params.id);
      if (!permiso) return res.status(404).json({ error: 'Permisos no encontrada' });
      res.status(200).json(permiso);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener permiso' });
    }
  },

  update: async (req, res) => {
    try {
      const permiso = await Permisos.findByPk(req.params.id);
      if (!permiso) return res.status(404).json({ error: 'Permisos no encontrada' });

      await permiso.update(req.body);
      res.status(200).json(permiso);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar permiso' });
    }
  },

  deleteId: async (req, res) => {
    try {
      const permiso = await Permisos.findByPk(req.params.id);
      if (!permiso) return res.status(404).json({ error: 'Permisos no encontrada' });

      await permiso.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar permiso' });
    }
  },
};

export default permisoController;
