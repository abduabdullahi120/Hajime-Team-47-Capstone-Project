import Project from '../models/Project.js';
import { failure } from '../utils/apiResponse.js';

export async function projectApiKey(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!key) return failure(res, 401, 'X-API-Key header is required');
  const project = await Project.findOne({ apiKey: key }).select('+apiKey');
  if (!project) return failure(res, 401, 'Invalid project API key');
  req.project = project;
  next();
}
