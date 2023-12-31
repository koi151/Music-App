import { Request, Response } from 'express';

import Song from '../../models/song.model';

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