import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATOS_PUBLIC_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  },
  logging: false
});

export default sequelize;
