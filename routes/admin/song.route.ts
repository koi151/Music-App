import { Router } from 'express';
import multer from 'multer';

const router: Router = Router();

import * as controller from '../../controllers/admin/song.controller';
import * as uploadCloud from '../../middlewares/admin/uploadCloud.middleware'

import * as validate from "../../validate/song.validate";

const upload = multer();

router.get('/', controller.index);

router.get('/create', controller.create);


router.post(
  "/create",
  validate.createPost, // !
  upload.fields(
    [
      { name: 'avatar', maxCount: 1 },
      { name: 'audio', maxCount: 1 }
    ]
  ),
  uploadCloud.uploadFields,
  controller.createPost
);


export const songRoutes: Router = router; 