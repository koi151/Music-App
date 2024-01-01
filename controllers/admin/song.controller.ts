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

interface SongData {
  title: string;
  description: string;
  singerId: string;
  topicId: string;
  lyrics: string;
  status: string;
}

// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
  try {
    // using object improve the security of data - user cannot add extra field
    const songData: SongData = {
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
    if(req.body.audio) {
      songData["audio"] = req.body.audio[0];
    }

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

// [GET] /admin/songs/edit/:songId
export const edit = async (req: Request, res: Response) => {
  try {
    const song = await Song.findOne({
      _id: req.params.songId,
      deleted: false
    })

    const topics = await Topic.find({
      deleted: false
    }).select('title');

    const singers = await Singer.find({
      deleted: false
    }).select('fullName');
  
    res.render('admin/pages/songs/edit', {
      pageTitle: "Edit Song",
      song: song,
      topics: topics,
      singers: singers,
    })
    
    
  } catch (error) {
    console.log('Error occurred in [GET] /admin/songs/edit/:songId', error);
    res.status(400).json({
      code: 400,
      message: "Error occurred"
    })
  }
}

// [PATCH] /admin/songs/edit/:songId
export const editPatch = async (req: Request, res: Response) => {
  try {
    const songId = req.params.songId;

    // using object improve the security of data - user cannot add extra field
    const songData: SongData = {
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
    if(req.body.audio) {
      songData["audio"] = req.body.audio[0];
    }

    await Song.updateOne({
      _id: songId
    }, songData);

    res.redirect(`/${systemConfig.adminPrefix}/songs`);
    
  } catch (error) {
    console.log('Error occurred in [PATCH] /admin/songs/edit/:songId:', error);
    res.status(400).json({
      code: 400,
      message: "Error occurred"
    })
  }
}