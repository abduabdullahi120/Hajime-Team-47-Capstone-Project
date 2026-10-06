import { Router } from 'express';
import { projectApiKey } from '../middleware/apiKey.js';
import Collection from '../models/Collection.js';
import Record from '../models/Record.js';
import { success } from '../utils/apiResponse.js';

const router=Router(); router.use(projectApiKey);
router.get('/:collection',async(req,res,next)=>{try{const c=await Collection.findOne({project:req.project._id,name:req.params.collection}); if(!c)return res.status(404).json({success:false,message:'Collection not found',data:null}); const page=Math.max(Number(req.query.page||1),1),limit=Math.min(Math.max(Number(req.query.limit||10),1),100),skip=(page-1)*limit; const search=String(req.query.search||'').trim(); const filter={collection:c._id}; if(search)filter['data.name']={$regex:search,$options:'i'}; const [items,total]=await Promise.all([Record.find(filter).sort({createdAt:-1}).skip(skip).limit(limit),Record.countDocuments(filter)]); return success(res,200,'Public records retrieved',items,{page,limit,total,pages:Math.ceil(total/limit)});}catch(e){next(e)}});
router.post('/:collection',async(req,res,next)=>{try{const c=await Collection.findOne({project:req.project._id,name:req.params.collection});if(!c)return res.status(404).json({success:false,message:'Collection not found',data:null});const item=await Record.create({collection:c._id,data:req.body});return success(res,201,'Public record created',item)}catch(e){next(e)}});
export default router;
