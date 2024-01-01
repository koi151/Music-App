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
exports.listen = exports.favorite = exports.like = exports.detail = exports.topics = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_songs_model_1 = __importDefault(require("../../models/favorite-songs.model"));
const topics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topic = yield topic_model_1.default.findOne({
            slug: req.params.slugTopic,
            deleted: false,
            status: 'active'
        });
        const songs = yield song_model_1.default.find({
            topicId: topic.id,
            deleted: false,
            status: 'active'
        }).select('slug avatar title singerId like');
        for (const song of songs) {
            const singerInfo = yield singer_model_1.default.findOne({
                _id: song.singerId,
                status: "active",
                deleted: false
            }).select('fullName');
            song['singerInfo'] = singerInfo;
        }
        res.render('client/pages/songs/list.pug', {
            pageTitle: topic.title,
            songs: songs
        });
    }
    catch (error) {
        console.log('Error occurred in [GET] /songs/nhac-tre:', error);
    }
});
exports.topics = topics;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const song = yield song_model_1.default.findOne({
            slug: req.params.slugTopic,
            deleted: false,
            status: "active"
        });
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false
        }).select('fullName');
        const topic = yield topic_model_1.default.findOne({
            _id: song.topicId,
            deleted: false
        }).select('title');
        const favoriteSong = yield favorite_songs_model_1.default.findOne({
            songId: song.id
        });
        song['favoriteSong'] = favoriteSong ? true : false;
        res.render('client/pages/songs/detail.pug', {
            pageTitle: 'Song Detail',
            song: song,
            singer: singer,
            topic: topic
        });
    }
    catch (error) {
        console.log('Error occurred in [GET] /songs/detail/:slugTopic:', error);
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songId = req.params.songId;
        const likeType = req.params.type;
        const selectedSong = yield song_model_1.default.findOne({
            _id: songId,
            status: 'active',
            deleted: false
        });
        const updatedLike = likeType == 'like' ? selectedSong.like + 1 : selectedSong.like - 1;
        yield song_model_1.default.updateOne({ _id: songId }, { like: updatedLike });
        res.status(200).json({
            code: 200,
            message: 'Success',
            like: updatedLike
        });
    }
    catch (error) {
        console.log('Error occurred in [GET] /songs/like/:type/:songId', error);
    }
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songId = req.params.songId;
        const favoriteType = req.params.favoriteType;
        switch (favoriteType) {
            case 'favorite':
                const existedFavoriteSong = yield favorite_songs_model_1.default.findOne({
                    songId: songId
                });
                if (!existedFavoriteSong) {
                    const newFavoriteSong = new favorite_songs_model_1.default({
                        songId: songId
                    });
                    yield newFavoriteSong.save();
                }
                break;
            case 'unfavorite':
                yield favorite_songs_model_1.default.deleteOne({
                    songId: songId
                });
                break;
            default:
                break;
        }
        res.status(200).json({
            code: 200,
            message: 'Success'
        });
    }
    catch (error) {
        console.log('Error occurred in [GET] /songs/like/:favoriteType/:songId', error);
    }
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songId = req.params.songId;
        const song = yield song_model_1.default.findOne({
            _id: songId,
            deleted: false
        });
        const newListens = song.listen + 1;
        yield song_model_1.default.updateOne({ _id: songId }, { listen: newListens });
        const newSongData = yield song_model_1.default.findOne({
            _id: songId
        });
        res.status(200).json({
            code: 200,
            message: 'Success',
            listen: newSongData.listen
        });
    }
    catch (error) {
        console.log('Error occurred in [GET] /songs/like/:favoriteType/:songId', error);
    }
});
exports.listen = listen;
