const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../config/passport');
const { verifyToken } = require('../config/jwt');
const {
  signUp,
  login,
  logout,
  profile
} = require('../controllers/authController');

router.post('/signup', signUp);

router.post('/login', passport.authenticate('local'), login);

router.get('/profile', verifyToken, profile);

router.get('/logout', logout);

module.exports = router;
