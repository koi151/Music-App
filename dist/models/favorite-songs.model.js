"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FavoriteSchema = new mongoose_1.default.Schema({
    songId: String,
    userId: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true,
});
const FavoriteSong = mongoose_1.default.model("Favorite", FavoriteSchema, 'favorite-songs');
exports.default = FavoriteSong;
