import express from 'express';
import multer from 'multer';
import { createProject, getProjects, deleteProject } from '../controllers/projectController.js'; // ✅ Funciones del controlador

const router = express.Router();

// Configuración de multer: memoria en vez de guardar en disco (¡mejor para Cloudinary!)
const storage = multer.memoryStorage(); // 🔥
const upload = multer({ storage });

// Ruta para crear un nuevo proyecto
router.post('/proyectos', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'pdf', maxCount: 1 }
]), createProject);

// Ruta para obtener todos los proyectos
router.get('/proyectos', getProjects);

// Ruta para eliminar un proyecto
router.delete('/proyectos/:id', deleteProject);

export default router;
