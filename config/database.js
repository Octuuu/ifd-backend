import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './comments.sqlite',
  logging: false
});

// Exportar el objeto sequelize con la sintaxis ES6
export default sequelize;
