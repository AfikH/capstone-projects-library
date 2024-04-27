import express from 'express';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import projectRoutes from './routes/projects.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);

app.listen(PORT, () => {
    console.log(`capstone-projects-library-backend is running on port ${PORT}`);
});