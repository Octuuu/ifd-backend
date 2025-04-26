import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Project from '../models/Project.js';

// 👇 Solución para __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para manejar la creación de proyectos
export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.files || !req.files.pdf || !req.files.image) {
      return res.status(400).json({ message: 'Faltan archivos PDF o de imagen.' });
    }

    const pdf = req.files.pdf[0];
    const image = req.files.image[0];

    const pdfPath = path.join(__dirname, '../uploads', pdf.filename);
    const imagePath = path.join(__dirname, '../uploads', image.filename);

    const moveFile = (file, destPath) => {
      return new Promise((resolve, reject) => {
        fs.rename(file.path, destPath, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    };

    await Promise.all([
      moveFile(pdf, pdfPath),
      moveFile(image, imagePath),
    ]);

    const project = await Project.create({
      title,
      description,
      pdf: pdf.filename,  // Solo el nombre, no la ruta completa
      image: image.filename,
    });

    res.status(201).json({ message: 'Proyecto creado con éxito', project });
  } catch (error) {
    console.error('Error al crear el proyecto:', error);
    res.status(500).json({ message: 'Error al crear el proyecto.', error: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error al obtener los proyectos:', error);
    res.status(500).json({ message: 'Error al obtener los proyectos.', error: error.message });
  }
};

// Eliminar un proyecto por ID
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado.' });
    }

    // Eliminar archivos asociados (imagen y PDF)
    const pathToImage = path.join(__dirname, '../uploads', project.image);
    const pathToPDF = path.join(__dirname, '../uploads', project.pdf);

    // Eliminar archivos del sistema
    [pathToImage, pathToPDF].forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    await project.destroy(); // Eliminar de la base de datos

    res.status(200).json({ message: 'Proyecto eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    res.status(500).json({ message: 'Error al eliminar el proyecto.', error: error.message });
  }
};
