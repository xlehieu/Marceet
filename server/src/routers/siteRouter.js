import express from 'express';

import * as SitesController from '../app/controllers/ProductController.js';
const router = express.Router();

router.get('/', SitesController.show);

export default router;
