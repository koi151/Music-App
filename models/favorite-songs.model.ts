import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema(
  {
    songId: String,
    userId: String,
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

const Favorite = mongoose.model("Favorite", FavoriteSchema, 'favorite-songs');

export default Favorite;