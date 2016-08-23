'use strict';

import express from 'express';
import models from '../models';
import auth from '../lib/passport';

const User = models.User;
const router = express.Router();

router.post('/login', auth, (req, res) => {
 res.send('authed!');
});

router.post('/signup', (req, res) => {
 // TODO create user
 res.sendStatus(501);
});

export default router;