import { Router } from 'express';
const router = Router();
import { getAll, create, getById, update, deleteId } from '../controllers/HabitacionesController.js';

// Rutas para habitaciones
//router.use("/habitaciones");
router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleteId);

export default router;