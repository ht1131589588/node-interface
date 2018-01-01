'use strict';

import express from 'express'
import Article from '../controllers/article/index'

const router = express.Router();

router.post('/add',Article.add);
router.get('/get',Article.get);
router.post('/lists',Article.lists);
router.post('/modify',Article.modify);
router.post('/delete',Article.delete);

export default router;