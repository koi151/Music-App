"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const favorite_songs_model_1 = __importDefault(require("../../models/favorite-songs.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favoriteSongs = yield favorite_songs_model_1.default.find({
            deleted: false
        });
        for (const song of favoriteSongs) {
            const songInfo = yield song_model_1.default.findOne({
                _id: song["songId"]
            });
            const singerInfo = yield singer_model_1.default.findOne({
                _id: songInfo.singerId
            });
            song['songInfo'] = songInfo;
            song['singerInfo'] = singerInfo;
        }
        res.render('client/pages/favorite-songs/index.pug', {
            pageTitle: 'Favorite Song',
            favoriteSongs: favoriteSongs
        });
    }
    catch (error) {
        console.log('Error occured in [GET] /favorite-song:', error);
        res.status(400).json({
            code: 400,
            message: 'Not existed'
        });
    }
});
exports.index = index;
