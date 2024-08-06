const express = require('express');
const app = express();
const connectDB = require('./config/database');
require('dotenv').config();

// routes
const bodyParser = require('body-parser');
const blogRouter = require('./routes/BlogRoutes');
const userRoute = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

// DB connect
connectDB();

// Middleware to parse JSON
app.use(express.json());

app.use(bodyParser.json());

// Middleware to add /api prefix to all routes
// app.use((req, res, next) => {
//     if (!req.url.startsWith('/api')) {
//         req.url = `/api${req.url}`;
//     }
//     next();
// });
app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/user', userRoute);


// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listen at port ${port}`)
});