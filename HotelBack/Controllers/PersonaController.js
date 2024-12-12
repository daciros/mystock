import { Persona } from '../models/index.js';


  export const getAll = async (req, res) => {
    try {
      const personas = await Persona.findAll();
      res.status(200).json(personas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener personas' });
    }
  };

  export const create = async (req, res) => {
    try {
      const nuevaPersona = await Persona.create(req.body);
      res.status(201).json(nuevaPersona);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear persona' });
    }
  };

  export const getById = async (req, res) => {
    try {
      const persona = await Persona.findByPk(req.params.id);
      if (!persona) return res.status(404).json({ error: 'Persona no encontrada' });
      res.status(200).json(persona);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener persona' });
    }
  };

  export const update = async (req, res) => {
    try {
      const persona = await Persona.findByPk(req.params.id);
      if (!persona) return res.status(404).json({ error: 'Persona no encontrada' });

      await persona.update(req.body);
      res.status(200).json(persona);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar persona' });
    }
  };

  export const deleteId = async (req, res) => {
    try {
      const persona = await Persona.findByPk(req.params.id);
      if (!persona) return res.status(404).json({ error: 'Persona no encontrada' });

      await persona.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar persona' });
    }
  };

