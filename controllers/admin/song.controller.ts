import { Request, Response } from 'express';

import Song from '../../models/song.model';
import Topic from '../../models/topic.model';
import Singer from '../../models/singer.model';
import { systemConfig } from '../../config/system';

// [GET] /admin/songs
export const index = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find({
      deleted: false
    })

    res.render('admin/pages/songs/index.pug', {
      pageTitle: 'Song List',
      songs: songs
    })

  } catch (error) {
    console.log('Error occurred in [GET] /admin/songs:', error);
    res.status(400).json({
      code: 400,
      message: "Not existed"
    })
  }
}

// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
  try {
    const topics = await Topic.find({
      deleted: false
    }).select('title');

    const singers = await Singer.find({
      deleted: false
    }).select('fullName');

    res.render('admin/pages/songs/create', {
      pageTitle: 'Create Song',
      topics: topics,
      singers: singers
    })

  } catch (error) {
    console.log('Error occurred in [GET] /admin/songs:', error);
    res.status(400).json({
      code: 400,
      message: "Not existed"
    })
  }
}

// [POST] /admin/songs/create

interface SongData {
  title: string;
  avatar: string;
  audio: string;
  description: string;
  singerId: string;
  topicId: string;
  lyrics: string;
  status: string;
}

export const createPost = async (req: Request, res: Response) => {
  try {
    let avatar = "";
    let audio = "";

    if (req.body.avatar) {
      avatar = req.body.avatar[0];
    }

    if(req.body.audio) {
      audio = req.body.audio[0];
    }

    // using object improve the security of data - user cannot add extra field
    const songData: SongData = {
      title: req.body.title,
      avatar: avatar,
      audio: audio,
      description: req.body.description,
      singerId: req.body.singerId,
      topicId: req.body.topicId,
      lyrics: req.body.lyric,
      status: req.body.status,
    };

    const newSong = new Song(songData);

    await newSong.save();

    res.redirect(`/${systemConfig.adminPrefix}/songs`);
    
  } catch (error) {
    console.log('Error occurred in [POST] /admin/songs/create:', error);
    res.status(400).json({
      code: 400,
      message: "Error occurred"
    })
  }
}