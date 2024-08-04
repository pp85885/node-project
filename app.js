const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const blogRouter = require('./routes/BlogRoutes');

// load the env variable
require('dotenv').config();
const port = process.env.PORT || 1333;
const uri = process.env.MONGOOSE_URI || "mongodb://127.0.0.1:27017/";
const dbName = process.env.DB_NAME || 'first_db';
const fullUri = `${uri}/${dbName}`;


// DB connection
mongoose.connect(fullUri).then(() => console.log('Database connected')).catch((err) => {
    console.log('database not connected', err);
});


app.listen(port, () => {
    console.log(`Server listen at port ${port}`)
});

// Middleware to parse JSON
app.use(express.json());

app.use(bodyParser.json());

app.use('/api/blogs', blogRouter);