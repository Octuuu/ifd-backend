import express from 'express';
import multer from 'multer';
import { createProject, getProjects, deleteProject } from '../controllers/projectController.js'; // Importa las funciones del controlador

const router = express.Router();

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta de destino
  },
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para el archivo
  }
});

const upload = multer({ storage });

// Ruta para crear un nuevo proyecto
router.post('/proyectos', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'pdf', maxCount: 1 }
]), createProject);  // Usa la función del controlador

// Ruta para obtener todos los proyectos
router.get('/proyectos', getProjects);  // Usa la función del controlador
router.delete('/proyectos/:id', deleteProject);

export default router;  // Usa export default en lugar de module.exports
