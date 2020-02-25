const User = require('../models/User');
const { signToken, verifyToken } = require('../config/jwt');

exports.signUp = (req, res) => {
  User.register({ ...req.body }, req.body.password)
    .then(user => res.status(201).json({ user }))
    .catch(err => res.status(500).json({ err }));
};

exports.login = (req, res) => {
  const [header, payload, signature] = signToken(req.user);
  res.cookie('headload', `${header}.${payload}.`, {
    // maxAge: 1000 * 60 * 60 * 6,
    // secure: true
  });
  res.cookie('signature', signature, {
    // httpOnly:true
    // secure: true
  });
  res.status(200).json({ user: req.user });
};

exports.logout = (req, res) => {
  res.clearCookie('headload');
  res.clearCookie('signature');
  res.status(200).json({ message: 'Session Out' });
};

exports.profile = (req, res, next) => {
  User.findById(req.user._id, { hash: 0, salt: 0 })
    .then(user => res.status(200).json({ user }))
    .catch(err => res.status(401).json({ err }));
};
