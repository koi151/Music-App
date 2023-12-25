import Topic from '../models/topics.model'

import { Request, Response } from 'express';


// [GET] /topics
export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    res.render('client/pages/topics/index.pug', {
      pageTitle: 'Song Topics'
    })

  } catch (error) {
    console.log('Error occurred in [GET] /topics:', error);
  }
}