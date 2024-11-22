const { Sedes } = require('../models');

const sedeController = {
  getAll: async (req, res) => {
    try {
      const sedes = await Sedes.findAll();
      res.status(200).json(sedes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener sedes' });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaSede = await Sedes.create(req.body);
      res.status(201).json(nuevaSede);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear sede' });
    }
  },

  getById: async (req, res) => {
    try {
      const sede = await Sedes.findByPk(req.params.id);
      if (!sede) return res.status(404).json({ error: 'Sedes no encontrada' });
      res.status(200).json(sede);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener sede' });
    }
  },

  update: async (req, res) => {
    try {
      const sede = await Sedes.findByPk(req.params.id);
      if (!sede) return res.status(404).json({ error: 'Sedes no encontrada' });

      await sede.update(req.body);
      res.status(200).json(sede);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar sede' });
    }
  },

  delete: async (req, res) => {
    try {
      const sede = await Sedes.findByPk(req.params.id);
      if (!sede) return res.status(404).json({ error: 'Sedes no encontrada' });

      await sede.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar sede' });
    }
  },
};

module.exports = sedeController;
