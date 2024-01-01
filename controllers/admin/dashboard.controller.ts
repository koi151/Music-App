import { Request, Response } from 'express';


// [GET] /admin/dashboard
export const index = async (req: Request, res: Response) => {
  try {
    res.render('admin/pages/dashboard/index.pug', {
      pageTitle: 'Dashboard'
    })

  } catch (error) {
    console.log('Error occurred in [GET] /admin/dashboard:', error);
    res.status(400).json({
      code: 400,
      message: "Not existed"
    })
  }
}