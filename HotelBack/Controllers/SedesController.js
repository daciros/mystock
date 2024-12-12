import { Sedes } from '../models/index.js';


  export const getAll = async (req, res) => {
    try {
      const sedes = await Sedes.findAll();
      res.status(200).json(sedes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener sedes' });
    }
  };

  export const create = async (req, res) => {
    try {
      const nuevaSede = await Sedes.create(req.body);
      res.status(201).json(nuevaSede);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear sede' });
    }
  };

  export const getById = async (req, res) => {
    try {
      const sede = await Sedes.findByPk(req.params.id);
      if (!sede) return res.status(404).json({ error: 'Sedes no encontrada' });
      res.status(200).json(sede);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener sede' });
    }
  };

  export const update = async (req, res) => {
    try {
      const sede = await Sedes.findByPk(req.params.id);
      if (!sede) return res.status(404).json({ error: 'Sedes no encontrada' });

      await sede.update(req.body);
      res.status(200).json(sede);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar sede' });
    }
  };

  export const deleteId = async (req, res) => {
    try {
      const sede = await Sedes.findByPk(req.params.id);
      if (!sede) return res.status(404).json({ error: 'Sedes no encontrada' });

      await sede.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar sede' });
    }
  };

