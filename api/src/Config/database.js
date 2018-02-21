import dotenv from 'dotenv';
import Sequelize from 'sequelize';


// Load .env file variables
dotenv.config();


let { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    'host': DB_HOST,
    'dialect': 'mysql'
});