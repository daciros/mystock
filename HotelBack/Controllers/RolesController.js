import { Roles } from '../models/index.js';


  export const getAll = async (req, res) => {
    try {
      const rols = await Roles.findAll();
      res.status(200).json(rols);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener rols' });
    }
  };

  export const create = async (req, res) => {
    try {
      const nuevaRol = await Roles.create(req.body);
      res.status(201).json(nuevaRol);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear rol' });
    }
  };

  export const getById = async (req, res) => {
    try {
      const rol = await Roles.findByPk(req.params.id);
      if (!rol) return res.status(404).json({ error: 'Roles no encontrada' });
      res.status(200).json(rol);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener rol' });
    }
  };

  export const update = async (req, res) => {
    try {
      const rol = await Roles.findByPk(req.params.id);
      if (!rol) return res.status(404).json({ error: 'Roles no encontrada' });

      await rol.update(req.body);
      res.status(200).json(rol);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar rol' });
    }
  };

  export const deleteId = async (req, res) => {
    try {
      const rol = await Roles.findByPk(req.params.id);
      if (!rol) return res.status(404).json({ error: 'Roles no encontrada' });

      await rol.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar rol' });
    }
  };

