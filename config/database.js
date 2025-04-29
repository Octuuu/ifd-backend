import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './comments.sqlite',
  logging: false
});

export default sequelize;