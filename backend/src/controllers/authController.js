import { register, login } from '../services/authService.js';
import { success } from '../utils/apiResponse.js';

export async function registerUser(req, res) { const data = await register(req.body); return success(res, 201, 'Account created successfully', data); }
export async function loginUser(req, res) { const data = await login(req.body); return success(res, 200, 'Login successful', data); }
export async function me(req, res) { return success(res, 200, 'Current user', { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role }); }
