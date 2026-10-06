import Collection from '../models/Collection.js';
import Record from '../models/Record.js';
import { success } from '../utils/apiResponse.js';

export async function listCollections(req, res) { const items = await Collection.find({ project: req.project._id }).sort({ name: 1 }); return success(res, 200, 'Collections retrieved', items); }
export async function createCollection(req, res) { const item = await Collection.create({ ...req.body, project: req.project._id }); return success(res, 201, 'Collection created', item); }
export async function deleteCollection(req, res) { const collection = await Collection.findOne({ _id: req.params.collectionId, project: req.project._id }); if (!collection) return res.status(404).json({success:false,message:'Collection not found',data:null}); await Record.deleteMany({ collection: collection._id }); await Collection.deleteOne({ _id: collection._id }); return success(res, 200, 'Collection deleted'); }
