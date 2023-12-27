import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/song.controller'

router.get("/:slugTopic", controller.topics);

router.get("/detail/:slugTopic", controller.detail);

export const songRoutes: Router = router; 