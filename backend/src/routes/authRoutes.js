import { Router } from 'express';
import { z } from 'zod';
import { registerUser, loginUser, me } from '../controllers/authController.js';
import { validate } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';

const router=Router();
const schema=z.object({name:z.string().min(2).max(80),email:z.string().email(),password:z.string().min(8).max(128)});
router.post('/register',validate(schema),registerUser); router.post('/login',validate(z.object({email:z.string().email(),password:z.string().min(1)})),loginUser); router.get('/me',protect,me); export default router;
