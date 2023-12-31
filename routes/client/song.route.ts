import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/client/song.controller';

router.get("/:slugTopic", controller.topics);

router.get("/detail/:slugTopic", controller.detail);

router.patch("/like/:type/:songId", controller.like);

router.patch("/favorite/:favoriteType/:songId", controller.favorite);

router.patch('/listen/:songId', controller.listen);

export const songRoutes: Router = router; 