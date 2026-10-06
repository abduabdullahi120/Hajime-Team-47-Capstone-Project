import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true, strict: false });

recordSchema.index({ collection: 1, createdAt: -1 });
export default mongoose.model('Record', recordSchema);
