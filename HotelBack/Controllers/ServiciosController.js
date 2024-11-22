const { Servicio } = require('../models');

const servicioController = {
  getAll: async (req, res) => {
    try {
      const servicios = await Servicio.findAll();
      res.status(200).json(servicios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener servicios' });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaServicio = await Servicio.create(req.body);
      res.status(201).json(nuevaServicio);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear servicio' });
    }
  },

  getById: async (req, res) => {
    try {
      const servicio = await Servicio.findByPk(req.params.id);
      if (!servicio) return res.status(404).json({ error: 'Servicio no encontrada' });
      res.status(200).json(servicio);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener servicio' });
    }
  },

  update: async (req, res) => {
    try {
      const servicio = await Servicio.findByPk(req.params.id);
      if (!servicio) return res.status(404).json({ error: 'Servicio no encontrada' });

      await servicio.update(req.body);
      res.status(200).json(servicio);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar servicio' });
    }
  },

  delete: async (req, res) => {
    try {
      const servicio = await Servicio.findByPk(req.params.id);
      if (!servicio) return res.status(404).json({ error: 'Servicio no encontrada' });

      await servicio.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar servicio' });
    }
  },
};

module.exports = servicioController;
