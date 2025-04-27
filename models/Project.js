import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // ✅

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pdf: {
    type: DataTypes.STRING,
    allowNull: false, // URL del PDF en Cloudinary
  },
  pdf_public_id: {
    type: DataTypes.STRING, // Public ID del PDF en Cloudinary
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false, // URL de la imagen en Cloudinary
  },
  image_public_id: {
    type: DataTypes.STRING, // Public ID de la imagen en Cloudinary
    allowNull: false,
  },
});

// Exporta el modelo correctamente
export default Project;
