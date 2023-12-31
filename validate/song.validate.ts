// import { Request, Response, NextFunction } from "express";

// export const createPost = async (req: Request, res: Response, next: NextFunction) => {
//   if (!req.body.title) {
//     res.json({
//       code: 400,
//       message: "Title is required"
//     });
//     return;
//   }

//   if (!req.body.singerId) {
//     res.json({
//       code: 400,
//       message: "Singer is required"
//     });
//     return;
//   }

//   next();
// }

import { Request, Response, NextFunction } from "express";

const validateRequiredFields = (fields: { [key: string]: string | number | undefined }, res: Response) => {
  for (const key in fields) {
    if (!fields[key]) {
      res.status(400).json({
        code: 400,
        message: `${key} is required`
      });
      return false;
    }
  }
  return true;
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const requiredFields = {
    title: req.body.title,
    singerId: req.body.singerId,
    topicId: req.body.topicId
  };

  if (!validateRequiredFields(requiredFields, res)) {
    return;
  }

  next();
};
