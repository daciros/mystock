import { Servicios } from '../models/index.js';


  export const getAll = async (req, res) => {
    try {
      const servicios = await Servicios.findAll();
      res.status(200).json(servicios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener servicios' });
    }
  };

  export const create = async (req, res) => {
    try {
      const nuevaServicio = await Servicios.create(req.body);
      res.status(201).json(nuevaServicio);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear servicio' });
    }
  };

  export const getById = async (req, res) => {
    try {
      const servicio = await Servicios.findByPk(req.params.id);
      if (!servicio) return res.status(404).json({ error: 'Servicios no encontrada' });
      res.status(200).json(servicio);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener servicio' });
    }
  };

  export const update = async (req, res) => {
    try {
      const servicio = await Servicios.findByPk(req.params.id);
      if (!servicio) return res.status(404).json({ error: 'Servicios no encontrada' });

      await servicio.update(req.body);
      res.status(200).json(servicio);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar servicio' });
    }
  };

  export const deleteId = async (req, res) => {
    try {
      const servicio = await Servicios.findByPk(req.params.id);
      if (!servicio) return res.status(404).json({ error: 'Servicios no encontrada' });

      await servicio.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar servicio' });
    }
  };

