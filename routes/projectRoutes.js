import express from 'express';
import multer from 'multer';
import { createProject, getProjects, deleteProject } from '../controllers/projectController.js'; // ✅ Funciones del controlador
import path from 'path'; // Necesario para manejar rutas de archivos

const router = express.Router();

// Configuración de multer: guardamos archivos en el disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define la carpeta de destino según el tipo de archivo
    if (file.fieldname === 'pdf') {
      cb(null, path.join(__dirname, '..', 'uploads', 'pdf')); // Ruta para archivos PDF
    } else if (file.fieldname === 'image') {
      cb(null, path.join(__dirname, '..', 'uploads', 'images')); // Ruta para imágenes
    }
  },
  filename: (req, file, cb) => {
    // Definimos el nombre del archivo, usando el original
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

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
