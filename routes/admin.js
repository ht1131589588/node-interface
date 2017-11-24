'use strict';

import express from 'express'
import Admin from '../controllers/admin/index'

const router = express.Router();

router.post('/login',Admin.login);

export default router;