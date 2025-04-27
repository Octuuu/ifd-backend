import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // ✅ Cambiado a database.js

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  pdf: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Exporta el modelo correctamente con la sintaxis ES6
export default Project;
