import { Sequelize } from "sequelize";

import { dbName, username, password, host, dialect, port } from '../config/config.js'

const connection = new Sequelize(dbName, username, password, {
    host,
    dialect,
    port,
});

try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default connection