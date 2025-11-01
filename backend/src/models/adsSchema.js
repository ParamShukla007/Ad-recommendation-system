import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  // Array of keywords like ["designer handbags", "fashion sale"]
  keywords: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

const Ad = mongoose.model('Ad', adSchema);
export default Ad;


