import { Request, Response } from "express";

// [GET] /admin/upload
export const index = async (req: Request, res: Response) => {
  try {
    res.json({
      location: req.body.file
    })

  } catch (error) {
    console.log('Error occurred in [GET] /admin/upload:', error);
    res.status(400).json({
      code: 400,
      message: "Not existed"
    })
  }
}