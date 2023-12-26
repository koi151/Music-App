import mongoose from 'mongoose';

const singerSchema = new mongoose.Schema(
  {
    fullName: String, 
    avatar: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  },
  {
    timestamps: true,
  }
)

const Singer = mongoose.model("Singer", singerSchema, 'singers');

export default Singer;