const AppDataSource = require('../models/data-source');

const connectDB = async () => {
    return AppDataSource.initialize()
        .then(() => console.log('Database connected'))
        .catch((err) => {
            console.error('Database connection failed:', err);
            process.exit(1);
        });
};

module.exports = connectDB;