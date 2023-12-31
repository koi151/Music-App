import Topic from '../../models/topic.model'

import { Request, Response } from 'express';

// [GET] /topics
export const index = async (req: Request, res: Response) => {
  try {
    const topics = await Topic.find({
      deleted: false,
      status: "active"
    })

    res.render('client/pages/topics/index.pug', {
      pageTitle: 'Song Topics',
      topics: topics
    })

  } catch (error) {
    console.log('Error occurred in [GET] /topics:', error);
  }
}