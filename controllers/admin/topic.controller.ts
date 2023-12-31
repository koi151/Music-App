import { Request, Response } from 'express';

import Topic from '../../models/topic.model';

// [GET] /admin/topics
export const index = async (req: Request, res: Response) => {
  try {
    const topics = await Topic.find({
      deleted: false
    })

    res.render('admin/pages/topics/index', {
      pageTitle: "Topics Management",
      topics: topics
    });

  } catch (error) {
    console.log('Error occurred in [GET] /admin/topics:', error);
    res.status(400).json({
      code: 400,
      message: "Not existed"
    })
  }
}