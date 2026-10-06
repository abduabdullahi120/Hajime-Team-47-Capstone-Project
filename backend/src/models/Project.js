import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  description: { type: String, trim: true, maxlength: 300, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  apiKey: { type: String, required: true, unique: true, select: false }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
