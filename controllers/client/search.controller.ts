import { Request, Response } from 'express';

import Song from '../../models/song.model';
import Singer from '../../models/singer.model';

import { convertToSlug } from '../../helpers/convertToSlug';

// [GET] /search/:type
export const result = async (req: Request, res: Response) => {
  try {
    const searchType = req.params.type;
    const keyword: string = `${req.query.keyword}`;

    let newSongs = [];

    if(keyword) {
      const unidecodeSlug = convertToSlug(keyword);
      const slugRegex: RegExp = new RegExp(unidecodeSlug, "i");

      const songs = await Song.find({
        $or: [
          { title: keyword },
          { slug: slugRegex }
        ]
      });

      if (songs.length > 0) {
        for (const song of songs) {
          const singerInfo = await Singer.findOne({
            _id: song.singerId,
            deleted: false,
          })
  
          // song['singerInfo'] = singerInfo;
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
        })
        break;
      
      default:
        res.json({
          code: 400,
          message: "Error"
        });
        break;
    }

  } catch (error) {
    console.log('Error occurred in [GET] /search/:type :', error);
    res.json({
      code: 400,
      message: "Not existed"
    })
  }
}
