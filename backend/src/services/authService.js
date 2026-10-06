import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken } from '../utils/auth.js';

export async function register({ name, email, password }) {
  const exists = await User.findOne({ email });
  if (exists) { const err = new Error('An account with this email already exists'); err.status = 409; throw err; }
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: signToken(user) };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) { const err = new Error('Invalid email or password'); err.status = 401; throw err; }
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: signToken(user) };
}
