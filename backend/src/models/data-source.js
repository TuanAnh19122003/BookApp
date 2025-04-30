const { DataSource } = require('typeorm');
const Book = require('./entities/Book');
const Category = require('./entities/Category')

require('dotenv').config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        Book, 
        Category
    ],
    synchronize: true,
    dropSchema: false,
})

module.exports = AppDataSource;