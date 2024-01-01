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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const system_1 = require("../../config/system");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield song_model_1.default.find({
            deleted: false
        });
        res.render('admin/pages/songs/index.pug', {
            pageTitle: 'Song List',
            songs: songs
        });
    }
    catch (error) {
        console.log('Error occurred in [GET] /admin/songs:', error);
        res.status(400).json({
            code: 400,
            message: "Not existed"
        });
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield topic_model_1.default.find({
            deleted: false
        }).select('title');
        const singers = yield singer_model_1.default.find({
            deleted: false
        }).select('fullName');
        res.render('admin/pages/songs/create', {
            pageTitle: 'Create Song',
            topics: topics,
            singers: singers
        });
    }
    catch (error) {
        console.log('Error occurred in [GET] /admin/songs:', error);
        res.status(400).json({
            code: 400,
            message: "Not existed"
        });
    }
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songData = {
            title: req.body.title,
            description: req.body.description,
            singerId: req.body.singerId,
            topicId: req.body.topicId,
            lyrics: req.body.lyrics,
            status: req.body.status,
        };
        if (req.body.avatar) {
            songData["avatar"] = req.body.avatar[0];
        }
        if (req.body.audio) {
            songData["audio"] = req.body.audio[0];
        }
        const newSong = new song_model_1.default(songData);
        yield newSong.save();
        res.redirect(`/${system_1.systemConfig.adminPrefix}/songs`);
    }
    catch (error) {
        console.log('Error occurred in [POST] /admin/songs/create:', error);
        res.status(400).json({
            code: 400,
            message: "Error occurred"
        });
    }
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const song = yield song_model_1.default.findOne({
            _id: req.params.songId,
            deleted: false
        });
        const topics = yield topic_model_1.default.find({
            deleted: false
        }).select('title');
        const singers = yield singer_model_1.default.find({
            deleted: false
        }).select('fullName');
        res.render('admin/pages/songs/edit', {
            pageTitle: "Edit Song",
            song: song,
            topics: topics,
            singers: singers,
        });
    }
    catch (error) {
        console.log('Error occurred in [GET] /admin/songs/edit/:songId', error);
        res.status(400).json({
            code: 400,
            message: "Error occurred"
        });
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songId = req.params.songId;
        const songData = {
            title: req.body.title,
            description: req.body.description,
            singerId: req.body.singerId,
            topicId: req.body.topicId,
            lyrics: req.body.lyrics,
            status: req.body.status,
        };
        if (req.body.avatar) {
            songData["avatar"] = req.body.avatar[0];
        }
        if (req.body.audio) {
            songData["audio"] = req.body.audio[0];
        }
        yield song_model_1.default.updateOne({
            _id: songId
        }, songData);
        res.redirect(`/${system_1.systemConfig.adminPrefix}/songs`);
    }
    catch (error) {
        console.log('Error occurred in [PATCH] /admin/songs/edit/:songId:', error);
        res.status(400).json({
            code: 400,
            message: "Error occurred"
        });
    }
});
exports.editPatch = editPatch;
