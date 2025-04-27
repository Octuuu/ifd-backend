import Project from '../models/Project.js';
import path from 'path';
import fs from 'fs';

// Función para manejar la creación de proyectos
export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.files || !req.files.pdf || !req.files.image) {
      return res.status(400).json({ message: 'Faltan archivos PDF o de imagen.' });
    }

    const pdf = req.files.pdf[0];
    const image = req.files.image[0];

    // Guardar los archivos localmente
    const pdfPath = path.join(__dirname, '..', 'uploads', 'pdf', pdf.filename);
    const imagePath = path.join(__dirname, '..', 'uploads', 'images', image.filename);

    // Mover los archivos a las carpetas correspondientes
    fs.renameSync(pdf.path, pdfPath);
    fs.renameSync(image.path, imagePath);

    // Crear el proyecto en la base de datos
    const project = await Project.create({
      title,
      description,
      pdf: pdfPath,    // Guardamos la ruta local del archivo PDF
      image: imagePath, // Guardamos la ruta local de la imagen
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

    // Eliminar archivos locales
    const pdfPath = project.pdf;
    const imagePath = project.image;

    if (fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await project.destroy(); // Eliminar de la base de datos

    res.status(200).json({ message: 'Proyecto eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    res.status(500).json({ message: 'Error al eliminar el proyecto.', error: error.message });
  }
};
