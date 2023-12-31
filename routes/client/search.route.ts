import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/client/search.controller';

router.get('/:type', controller.result);

export const searchRoutes: Router = router;

