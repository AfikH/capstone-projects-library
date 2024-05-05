import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import cors from './middleware/cors.js';

import userRoutes from './routes/users.js';
import projectRoutes from './routes/projects.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('secret'));

app.use(cors());

// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
// 	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE');
// 	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// 	res.setHeader('Access-Control-Allow-Credentials', true);

// 	next();
// })

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);

app.listen(PORT, () => {
    console.log(`capstone-projects-library-backend is running on port ${PORT}`);
});