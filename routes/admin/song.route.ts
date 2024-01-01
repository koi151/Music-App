import { Router } from 'express';
import multer from 'multer';

const router: Router = Router();

import * as controller from '../../controllers/admin/song.controller';
import * as uploadCloud from '../../middlewares/admin/uploadCloud.middleware'

// import * as validate from "../../validate/song.validate";

const upload = multer();

router.get('/', controller.index);
router.get('/create', controller.create);
router.get('/edit/:songId', controller.edit);

router.post(
  "/create",
  // validate.createPost, // !
  upload.fields(
    [
      { name: 'avatar', maxCount: 1 },
      { name: 'audio', maxCount: 1 }
    ]
  ),
  uploadCloud.uploadFields,
  controller.createPost
);

router.patch(
  "/edit/:songId",
  // validate.createPost, // !
  upload.fields(
    [
      { name: 'avatar', maxCount: 1 },
      { name: 'audio', maxCount: 1 }
    ]
  ),
  uploadCloud.uploadFields,
  controller.editPatch
);

export const songRoutes: Router = router; 