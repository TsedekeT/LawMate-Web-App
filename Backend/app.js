import express from 'express';
import cors from 'cors';
import clientRoutes from './routes/clientRoutes.js';
import lawyerRoutes from './routes/lawyerRoutes.js';


const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/client', clientRoutes);
app.use('/lawyer', lawyerRoutes);

// Server Startup
app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});
