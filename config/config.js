import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DB_DIALECT } = process.env;

const databaseConfig = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: true
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: true
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT
  }
};

export default databaseConfig;
