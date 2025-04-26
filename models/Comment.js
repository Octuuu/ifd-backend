import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Comment = sequelize.define('Comment', {
  username: {
    type: DataTypes.STRING,
    defaultValue: 'Anónimo'  // Nombre por defecto si no se proporciona uno
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false  // El contenido del comentario es obligatorio
  },
  pageId: {
    type: DataTypes.STRING,
    allowNull: false  // La página a la que pertenece el comentario es obligatoria
  }
}, {
  timestamps: true  // Usar los campos createdAt y updatedAt automáticamente
});

export default Comment;  // Exporta el modelo correctamente
