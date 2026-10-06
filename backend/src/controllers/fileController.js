import fs from 'node:fs/promises';
import path from 'node:path';
import FileModel from '../models/File.js';
import { success } from '../utils/apiResponse.js';

export async function uploadFile(req, res) {
  if (!req.file) return res.status(400).json({success:false,message:'A file is required',data:null});
  const item = await FileModel.create({ project:req.project._id, originalName:req.file.originalname, storedName:req.file.filename, mimeType:req.file.mimetype, size:req.file.size, path:req.file.path });
  return success(res,201,'File uploaded successfully',{id:item._id, name:item.originalName, mimeType:item.mimeType, size:item.size, url:`/api/v1/files/${item._id}`});
}
export async function listFiles(req,res){const items=await FileModel.find({project:req.project._id}).sort({createdAt:-1}).select('-path'); return success(res,200,'Files retrieved',items);}
export async function downloadFile(req,res){const item=await FileModel.findOne({_id:req.params.fileId,project:req.project._id}); if(!item)return res.status(404).json({success:false,message:'File not found',data:null}); try{await fs.access(item.path);}catch{return res.status(404).json({success:false,message:'Stored file is unavailable',data:null});} res.type(item.mimeType); return res.download(path.resolve(item.path),item.originalName);}
