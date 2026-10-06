import crypto from 'node:crypto';
import Project from '../models/Project.js';
import Collection from '../models/Collection.js';
import { success } from '../utils/apiResponse.js';

const publicProject = (p) => ({ id: p._id, name: p.name, description: p.description, createdAt: p.createdAt });

export async function listProjects(req, res) { const items = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 }); return success(res, 200, 'Projects retrieved', items.map(publicProject)); }
export async function createProject(req, res) { const p = await Project.create({ ...req.body, owner: req.user._id, apiKey: `baas_${crypto.randomBytes(24).toString('hex')}` }); return success(res, 201, 'Project created', { ...publicProject(p), apiKey: p.apiKey }); }
export async function getProject(req, res) { return success(res, 200, 'Project retrieved', { ...publicProject(req.project), apiKey: req.project.apiKey }); }
export async function deleteProject(req, res) { await Collection.deleteMany({ project: req.project._id }); await Project.deleteOne({ _id: req.project._id }); return success(res, 200, 'Project deleted'); }
