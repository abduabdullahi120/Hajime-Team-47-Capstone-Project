import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';
import Project from '../models/Project.js';
import { failure } from '../utils/apiResponse.js';

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) return failure(res, 401, 'Authentication required');
    const payload = jwt.verify(header.slice(7), env.jwtSecret);
    const user = await User.findById(payload.sub);
    if (!user) return failure(res, 401, 'User account not found');
    req.user = user;
    next();
  } catch { return failure(res, 401, 'Invalid or expired authentication token'); }
}

export const requireAdmin = (req, res, next) => req.user?.role === 'admin' ? next() : failure(res, 403, 'Administrator permission required');

export async function requireProjectOwner(req, res, next) {
  const project = await Project.findOne({ _id: req.params.projectId, owner: req.user._id }).select('+apiKey');
  if (!project) return failure(res, 404, 'Project not found');
  req.project = project;
  next();
}
