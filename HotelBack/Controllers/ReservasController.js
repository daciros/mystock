const { Reserva } = require('../models');

const reservaController = {
  getAll: async (req, res) => {
    try {
      const reservas = await Reserva.findAll();
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener reservas' });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaReserva = await Reserva.create(req.body);
      res.status(201).json(nuevaReserva);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear reserva' });
    }
  },

  getById: async (req, res) => {
    try {
      const reserva = await Reserva.findByPk(req.params.id);
      if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
      res.status(200).json(reserva);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener reserva' });
    }
  },

  update: async (req, res) => {
    try {
      const reserva = await Reserva.findByPk(req.params.id);
      if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });

      await reserva.update(req.body);
      res.status(200).json(reserva);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar reserva' });
    }
  },

  delete: async (req, res) => {
    try {
      const reserva = await Reserva.findByPk(req.params.id);
      if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });

      await reserva.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar reserva' });
    }
  },
};

module.exports = reservaController;
