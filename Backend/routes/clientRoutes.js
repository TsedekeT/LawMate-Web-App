import express from 'express';
import { healthCheck, signUp, login } from '../controllers/clientController.js';

const router = express.Router();

// 🌍 Health Check Route
router.get('/', healthCheck);

// 📝 client Registration Route
router.post('/signUp', signUp);
router.post('/login', login);

export default router;
