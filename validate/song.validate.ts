// import { Request, Response, NextFunction } from "express";

// // Define an interface that extends the 'Request' object to include the 'body' property
// interface RequestWithBody extends Request {
//   body: {
//     title: string;
//     avatar: string;
//     audio: string;
//     description: string;
//     singerId: string;
//     topicId: string;
//     lyrics: string;
//     status: string;
//   };
// }

// export const createPost = async (req: RequestWithBody, res: Response, next: NextFunction): Promise<void> => {
//   const requiredFields = ["title", "singerId", "topicId"];

//   for (const field of requiredFields) {
//     if (!req.body[field]) {
//       res.json({
//         code: 400,
//         message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
//       });
//       return;
//     }
//   }

//   next();
// };
