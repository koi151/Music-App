import { Request, Response } from 'express';

import Song from '../../models/song.model';
import Topic from '../../models/topic.model';
import Singer from '../../models/singer.model';

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
    res.json({
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
    res.json({
      code: 400,
      message: "Not existed"
    })
  }
}