const { Rol } = require('../models');

const rolController = {
  getAll: async (req, res) => {
    try {
      const rols = await Rol.findAll();
      res.status(200).json(rols);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener rols' });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaRol = await Rol.create(req.body);
      res.status(201).json(nuevaRol);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear rol' });
    }
  },

  getById: async (req, res) => {
    try {
      const rol = await Rol.findByPk(req.params.id);
      if (!rol) return res.status(404).json({ error: 'Rol no encontrada' });
      res.status(200).json(rol);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener rol' });
    }
  },

  update: async (req, res) => {
    try {
      const rol = await Rol.findByPk(req.params.id);
      if (!rol) return res.status(404).json({ error: 'Rol no encontrada' });

      await rol.update(req.body);
      res.status(200).json(rol);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar rol' });
    }
  },

  delete: async (req, res) => {
    try {
      const rol = await Rol.findByPk(req.params.id);
      if (!rol) return res.status(404).json({ error: 'Rol no encontrada' });

      await rol.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar rol' });
    }
  },
};

module.exports = rolController;
