import { Router } from 'express';
import personaRoutes from './PersonaRoute.js';
import rolesRoutes from './rolesRoute.js';
import sedesRoutes from'./sedesRoute.js';
import habitacionesRoutes from'./HabitacionesRoute.js';
import reservasRoutes from'./reservasRoute.js';
import serviciosRoute from'./ServiciosRoute.js';

const router = Router();


// Registrar las rutas
router.use('/personas', personaRoutes);
router.use('/roles', rolesRoutes);
router.use('/sedes', sedesRoutes);
router.use('/habitaciones', habitacionesRoutes);
router.use('/reservas', reservasRoutes);
router.use('/servicios', serviciosRoute);

//module.exports = router;
export default router;