import Collection from '../models/Collection.js';
import Record from '../models/Record.js';
import { success } from '../utils/apiResponse.js';

export async function listRecords(req, res) {
  const collection = await Collection.findOne({ _id: req.params.collectionId, project: req.project._id });
  if (!collection) return res.status(404).json({ success:false, message:'Collection not found', data:null });
  const page = Math.max(Number(req.query.page || 1), 1), limit = Math.min(Math.max(Number(req.query.limit || 10), 1), 100);
  const skip = (page - 1) * limit;
  const query = { collection: collection._id };
  const [items, total] = await Promise.all([Record.find(query).sort({ createdAt:-1 }).skip(skip).limit(limit), Record.countDocuments(query)]);
  return success(res, 200, 'Records retrieved', items, { page, limit, total, pages: Math.ceil(total/limit) });
}
export async function createRecord(req, res) { const collection = await Collection.findOne({ _id:req.params.collectionId, project:req.project._id }); if (!collection) return res.status(404).json({success:false,message:'Collection not found',data:null}); const item=await Record.create({collection:collection._id,data:req.body}); return success(res,201,'Record created',item); }
export async function updateRecord(req, res) { const collection=await Collection.findOne({_id:req.params.collectionId,project:req.project._id}); if(!collection)return res.status(404).json({success:false,message:'Collection not found',data:null}); const item=await Record.findOneAndUpdate({ _id:req.params.recordId, collection:collection._id },{data:req.body},{new:true,runValidators:true}); if(!item)return res.status(404).json({success:false,message:'Record not found',data:null}); return success(res,200,'Record updated',item); }
export async function deleteRecord(req, res) { const collection=await Collection.findOne({_id:req.params.collectionId,project:req.project._id}); if(!collection)return res.status(404).json({success:false,message:'Collection not found',data:null}); const item=await Record.findOneAndDelete({_id:req.params.recordId,collection:collection._id}); if(!item)return res.status(404).json({success:false,message:'Record not found',data:null}); return success(res,200,'Record deleted'); }
