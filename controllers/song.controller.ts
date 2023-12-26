import { Request, Response } from "express"

import Topic from '../models/topic.model';
import Song from '../models/song.model';
import Singer from '../models/singer.model';


// [GET] /songs/:slugTopic
export const topics = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.findOne({
      slug: req.params.slugTopic,
      deleted: false, 
      status: 'active'
    })

    const songs = await Song.find({
      topicId: topic.id,
      deleted: false,
      status: 'active'
    }).select('avatar title singerId like slug')

    for (const song of songs) {
      const singerInfo = await Singer.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false
      }) 

      song['singerInfo'] = singerInfo;
    }

    res.render('client/pages/songs/list.pug', {
      pageTitle: topic.title,
      songs: songs
    })

  } catch (error) {
    console.log('Error occurred in [GET] /songs/nhac-tre:', error);
  }
}