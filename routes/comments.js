// backend/routes/comments.js
import express from 'express';
import { getComments, postComment, deleteComment } from '../controllers/commentController.js';  // Asegúrate de incluir '.js'

const router = express.Router();

// Ruta para obtener los comentarios de una página
router.get('/:pageId', getComments);

// Ruta para crear un nuevo comentario
router.post('/', postComment);

router.delete('/:id', deleteComment);  // Eliminar un comentario por ID

export default router;  // Exportar las rutas correctamente
