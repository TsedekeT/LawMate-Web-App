import express from 'express';
import {authenticateLawyer, login, fetchLawyer, deleteLawyer, approveLawyer} from '../controllers/lawyerController.js';

const router = express.Router();

// 📝 Lawyer Authentication Route
router.post('/authenticate', authenticateLawyer);
router.post('/login', login);
router.get('/fetch', fetchLawyer);
router.delete('/delete/:lawyer_id', deleteLawyer);
router.put('/approve/:lawyer_id', approveLawyer);
export default router;
