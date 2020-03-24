var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);
var Task = require('../models').Task;

/* GET ALL TASKS */
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      return Task
        .findAll({
          where: {
            userId: req.user.id
          }
        })
        .then(tasks => res.status(200).send(tasks))
        .catch(error => res.status(400).send(error));
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

/* GET TASK*/
router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
    if (token) {
      return Task
        .findOne({
          where: {
            id: req.params.id,
            userId: req.user.id
          }
        })
        .then(task => {
          if (!task) {
            return res.status(404).send({
              message: 'Task Not Found',
            });
          }
          return res.status(200).send(task);
        })
        .catch(error => res.status(400).send(error));
      } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
      }
});

/* CREATE TASK */
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Task.create({
        title: req.body.title,
        notes: req.body.notes,
        isComplete: req.body.isComplete,
        dueDate: req.body.dueDate,
        userId: req.user.id
      })
      .then(task => res.status(201).send(task))
      .catch(error => res.status(400).send(error));
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* UPDATE TASK */
router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Task.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id
        }
      })
      .then(task => {
        if (!task) {
          return res.status(404).send({
            message: 'Task Not Found',
          });
        }
        return task
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => res.status(200).send(task))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* DELETE TASK */
router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Task.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id
        }
      })
      .then(task => {
        if (!task) {
          return res.status(400).send({
            message: 'Task Not Found',
          });
        }
        return task
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
