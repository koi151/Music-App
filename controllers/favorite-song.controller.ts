import { Request, Response } from 'express';

import FavoriteSong from '../models/favorite-songs.model';
import Song from '../models/song.model';
import Singer from '../models/singer.model';

// [GET] /favorite-song
export const index = async (req: Request, res: Response) => {
  try {
    const favoriteSongs = await FavoriteSong.find({
      // userId
      deleted: false
    });

    for (const song of favoriteSongs) {
      const songInfo = await Song.findOne({
        _id: song["songId"]
      })
      
      const singerInfo = await Singer.findOne({
        _id: songInfo.singerId
      })

      song['songInfo'] = songInfo;
      song['singerInfo'] = singerInfo;
    }

    res.render('client/pages/favorite-songs/index.pug', {
      pageTitle: 'Favorite Song',
      favoriteSongs: favoriteSongs
    })

  } catch (error) {
    console.log('Error occured in [GET] /favorite-song:', error);
    res.json({
      code: 400,
      message: 'Not existed'
    })
  }
}