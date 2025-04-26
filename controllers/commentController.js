import Comment from '../models/Comment.js';  // Importa el modelo Comment

// Obtener comentarios para una página específica
export const getComments = async (req, res) => {
  try {
    const { pageId } = req.params;  // Parámetro de la URL
    const comments = await Comment.findAll({
      where: { pageId },  // Filtrar por la página específica
      order: [['createdAt', 'DESC']]  // Ordenar por fecha de creación, de más reciente a más antiguo
    });
    res.json(comments);  // Retornar los comentarios
  } catch (err) {
    console.error(err);  // Registrar el error para depuración
    res.status(500).json({ error: 'Error al obtener los comentarios' });  // Responder con un error genérico
  }
};

// Crear un nuevo comentario
export const postComment = async (req, res) => {
  try {
    const { username, content, pageId } = req.body;  // Recoger datos del cuerpo de la solicitud
    if (!content || !pageId) {  // Verificar si los campos requeridos existen
      return res.status(400).json({ error: 'Contenido y página son necesarios' });
    }

    // Si no se proporciona un nombre de usuario, asignar "Anónimo"
    const comment = await Comment.create({ username: username || 'Anónimo', content, pageId });

    res.status(201).json(comment);  // Responder con el comentario creado
  } catch (err) {
    console.error(err);  // Registrar el error para depuración
    res.status(400).json({ error: 'Error al crear el comentario' });  // Responder con un error genérico
  }
};

// Eliminar un comentario por ID
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Comment.destroy({
      where: { id }
    });

    if (deleted) {
      res.json({ message: 'Comentario eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Comentario no encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el comentario' });
  }
};

