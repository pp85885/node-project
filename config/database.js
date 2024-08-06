const mongoose = require('mongoose');
require('dotenv').config();


const uri = process.env.MONGOOSE_URI || "mongodb://127.0.0.1:27017/";
const dbName = process.env.DB_NAME || 'first_db';
const fullUri = `${uri}/${dbName}`;


// DB connection
const connectDB = async () => {
    try {
        await mongoose.connect(fullUri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });

        console.log('mongo db connected');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;


// mongoose.connect(fullUri).then(() => console.log('Database connected')).catch((err) => {
//     console.log('database not connected', err);
// });