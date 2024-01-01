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
exports.result = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const convertToSlug_1 = require("../../helpers/convertToSlug");
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchType = req.params.type;
        const keyword = `${req.query.keyword}`;
        let newSongs = [];
        if (keyword) {
            const unidecodeSlug = (0, convertToSlug_1.convertToSlug)(keyword);
            const slugRegex = new RegExp(unidecodeSlug, "i");
            const songs = yield song_model_1.default.find({
                $or: [
                    { title: keyword },
                    { slug: slugRegex }
                ]
            });
            if (songs.length > 0) {
                for (const song of songs) {
                    const singerInfo = yield singer_model_1.default.findOne({
                        _id: song.singerId,
                        deleted: false,
                    });
                    newSongs.push({
                        id: song.id,
                        title: song.title,
                        avatar: song.avatar,
                        slug: song.slug,
                        like: song.like,
                        singerInfo: {
                            fullName: singerInfo.fullName
                        }
                    });
                }
            }
        }
        switch (searchType) {
            case "result":
                res.render('client/pages/search/result', {
                    pageTitle: `Search result for ${keyword}`,
                    keyword: keyword,
                    songs: newSongs
                });
                break;
            case "suggest":
                res.json({
                    code: 200,
                    message: "Suggest successful",
                    songs: newSongs
                });
                break;
            default:
                res.json({
                    code: 400,
                    message: "Error"
                });
                break;
        }
    }
    catch (error) {
        console.log('Error occurred in [GET] /search/:type :', error);
        res.json({
            code: 400,
            message: "Not existed"
        });
    }
});
exports.result = result;
