import { Request, Response } from "express"

import Topic from '../models/topic.model';
import Song from '../models/song.model';
import Singer from '../models/singer.model';
import FavoriteSong from '../models/favorite-songs.model';

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
    }).select('slug avatar title singerId like')

    for (const song of songs) {
      const singerInfo = await Singer.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false
      }).select('fullName')

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

// [GET] /songs/detail/:slugTopic
export const detail = async (req: Request, res: Response) => {
  try {
    const song = await Song.findOne({
      slug: req.params.slugTopic,
      deleted: false,
      status: "active"
    })

    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false
    }).select('fullName')

    const topic = await Topic.findOne({
      _id: song.topicId,
      deleted: false
    }).select('title')

    const favoriteSong = await FavoriteSong.findOne({
      songId: song.id
    })

    song['favoriteSong'] = favoriteSong ? true : false;

    res.render('client/pages/songs/detail.pug', {
      pageTitle: 'Song Detail',
      song: song,
      singer: singer,
      topic: topic
    })

  } catch (error) {
    console.log('Error occurred in [GET] /songs/detail/:slugTopic:', error);
  }
}

// [PATCH] /songs/like/:type/:songId
export const like = async (req: Request, res: Response) => {
  try {
    const songId: string = req.params.songId;
    const likeType: string = req.params.type;

    const selectedSong = await Song.findOne({
      _id: songId,
      status: 'active',
      deleted: false
    })

    const updatedLike: number = likeType == 'like' ? selectedSong.like + 1 : selectedSong.like - 1;

    await Song.updateOne(
      { _id: songId },
      { like: updatedLike }
    )

    res.json({
      code: 200,
      message: 'Success',
      like: updatedLike
    })

  } catch (error) {
    console.log('Error occurred in [GET] /songs/like/:type/:songId', error);
  }
}


// [PATCH] /songs/like/:favoriteType/:songId
export const favorite = async (req: Request, res: Response) => {
  try {
    const songId: string = req.params.songId;
    const favoriteType: string = req.params.favoriteType;

    switch (favoriteType) {
      case 'favorite':
        const existedFavoriteSong = await FavoriteSong.findOne({
          songId: songId
        })

        if (!existedFavoriteSong) {
          const newFavoriteSong = new FavoriteSong({
            songId: songId
          }) 
          await newFavoriteSong.save();

        }
        break;

      case 'unfavorite':
        await FavoriteSong.deleteOne({
          songId: songId
        })
        break;

      default:
        break;
    }

    // await Song.updateOne(
    //   { _id: songId },
    //   { like: updatedLike }
    // )

    // res.json({
    //   code: 200,
    //   message: 'Success',
    //   like: updatedLike
    // })

    res.json({
      code: 200,
      message: 'Success'
    })

  } catch (error) {
    console.log('Error occurred in [GET] /songs/like/:favoriteType/:songId', error);
  }
}