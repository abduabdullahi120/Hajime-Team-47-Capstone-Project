import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  description: { type: String, trim: true, maxlength: 300, default: '' }
}, { timestamps: true });

collectionSchema.index({ project: 1, name: 1 }, { unique: true });
export default mongoose.model('Collection', collectionSchema);
