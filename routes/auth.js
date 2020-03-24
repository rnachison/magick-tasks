require('dotenv').config();
var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/').User;

router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    User.create({
      username: req.body.username,
      password: req.body.password
    })
    .then(function() {
      res.json({success: true, msg: 'Successful created new user.'});
    }).catch(function(err) {
      console.log(err);
      return res.json({success: false, msg: 'Username already exists.'});
    });
  }
});

router.post('/login', function(req, res) {
  User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(user => {
      if (!user) {
        return res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      }
      console.log('found user');
      user.comparePassword(req.body.password, function (err, isMatch) {
        console.log('inside user.comparePassword');
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), process.env.SECRET);
          // return the information including token as JSON
          return res.status(200).send({success: true, token: 'JWT ' + token});
        } else {
          return res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    })
  .catch(error => res.status(400).send(error));
});

module.exports = router;
