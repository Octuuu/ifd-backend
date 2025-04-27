import Project from '../models/Project.js';
import cloudinary from '../config/cloudinary.js';

// Función para manejar la creación de proyectos
export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.files || !req.files.pdf || !req.files.image) {
      return res.status(400).json({ message: 'Faltan archivos PDF o de imagen.' });
    }

    const pdf = req.files.pdf[0];
    const image = req.files.image[0];

    // Los archivos ya fueron subidos a Cloudinary, solo tomamos las URL
    const project = await Project.create({
      title,
      description,
      pdf: pdf.path,    // URL pública de Cloudinary
      image: image.path,
      pdf_public_id: pdf.filename,  // Guardamos el public_id si quieres borrar después
      image_public_id: image.filename,
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

    // Borrar archivos de Cloudinary
    const deletePromises = [];

    if (project.pdf_public_id) {
      deletePromises.push(cloudinary.uploader.destroy(project.pdf_public_id, { resource_type: 'raw' }));
    }
    if (project.image_public_id) {
      deletePromises.push(cloudinary.uploader.destroy(project.image_public_id, { resource_type: 'image' }));
    }

    await Promise.all(deletePromises);

    await project.destroy(); // Eliminar de la base de datos

    res.status(200).json({ message: 'Proyecto eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    res.status(500).json({ message: 'Error al eliminar el proyecto.', error: error.message });
  }
};
