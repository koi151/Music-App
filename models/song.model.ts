import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    description: String,
    singerId: String,
    topicId: String,
    like: {
      type: Number,
      default: 0
    },
    listen: {
      type: Number,
      default: 0
    },
    lyrics: String,
    audio: String,
    status: String,
    slug: {
      type: String,
      slug: "title",
      unique: true
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true
  }
)

const Song = mongoose.model('Song', songSchema, 'songs');

export default Song;