import Topic from '../models/topics.model'

import { Request, Response } from 'express';


// [GET] /topics
export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    res.send('ok');
  } catch (error) {
    console.log('Error occurred in [GET] /topics:', error);
  }
}