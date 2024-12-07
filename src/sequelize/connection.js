import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: 'postgres',
        dialectModule: require('pg'),
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: process.env.NODE_ENV === 'production' ? false : console.log
    }
);

export const sequelizeConnect = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}