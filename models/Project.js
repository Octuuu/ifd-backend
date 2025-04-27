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
    allowNull: false, // Ruta local del archivo PDF
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false, // Ruta local de la imagen
  },
});

export default Project;
