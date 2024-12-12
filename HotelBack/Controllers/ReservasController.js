import { Reservas } from '../models/index.js';


  export const getAll = async (req, res) => {
    try {
      const reservas = await Reservas.findAll();
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener reservas' });
    }
  };

  export const create = async (req, res) => {
    try {
      const nuevaReserva = await Reservas.create(req.body);
      res.status(201).json(nuevaReserva);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear reserva' });
    }
  };

  export const getById = async (req, res) => {
    try {
      const reserva = await Reservas.findByPk(req.params.id);
      if (!reserva) return res.status(404).json({ error: 'Reservas no encontrada' });
      res.status(200).json(reserva);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener reserva' });
    }
  };

  export const update = async (req, res) => {
    try {
      const reserva = await Reservas.findByPk(req.params.id);
      if (!reserva) return res.status(404).json({ error: 'Reservas no encontrada' });

      await reserva.update(req.body);
      res.status(200).json(reserva);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar reserva' });
    }
  };

  export const deleteId = async (req, res) => {
    try {
      const reserva = await Reservas.findByPk(req.params.id);
      if (!reserva) return res.status(404).json({ error: 'Reservas no encontrada' });

      await reserva.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar reserva' });
    }
  };
