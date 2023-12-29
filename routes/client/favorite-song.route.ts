import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/favorite-song.controller';

router.get('/', controller.index);

export const favoriteSongsRoutes: Router = router;