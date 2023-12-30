import { Request, Response } from 'express';

import Song from '../models/song.model';
import Singer from '../models/singer.model';

import { convertToSlug } from '../helpers/convertToSlug';

// [GET] /search/result/
export const result = async (req: Request, res: Response) => {
  try {
    const keyword: string = `${req.query.keyword}`

    const unidecodeSlug = convertToSlug(keyword);
    const slugRegex: RegExp = new RegExp(unidecodeSlug, "i");

    const songs = await Song.find({
      $or: [
        { title: keyword },
        { slug: slugRegex }
      ],
      deleted: false
    })

    for (const song of songs) {
      const singerInfo = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
      }).select('fullName avatar')

      song['singerInfo'] = singerInfo;
    }

    res.render('client/pages/search/result', {
      pageTitle: `Search result for ${keyword}`,
      songs: songs
    });

  } catch (error) {
    console.log('Error occurred in [GET] /search/result/ :', error);
    res.json({
      code: 400,
      message: "Not existed"
    })
  }
}