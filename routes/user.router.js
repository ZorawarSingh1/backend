import _ from 'lodash';
import {Router} from 'express';
import {ValidationError} from 'sequelize';

import models from '../models';

const User = models.User;
const router = new Router();

// TODO add permission checks to all routes except create
// TODO handle all validation errors in one place

router.get('/', (req, res) => {

  return User
    .findAll()
    .then(data => res.send(data));
});

router.post('/', (req, res) => {

  return User
    .create(req.body)
    .then(data => res.send(data))
    .catch(ValidationError, err => {
      res.status(400).send(err.errors[0]);
    });
});

router.get('/:id', (req, res) => {

  return User
    .findById(req.params.id)
    .then(gig => res.send(gig));
});

router.put('/:id', (req, res) => {
  var fields = Object.keys(req.body);
  fields = _.without(fields, 'password');

  return User
    .update(req.body, {
      where: {id: req.params.id},
      returning: true,
      fields: fields,
    })
    .then(([count, records])=> {
      if (count !== 1) {
        // TODO throw error instead
        res.sendStatus(500);
      }

      res.send(records[0]);
    })
    .catch(ValidationError, err => {
      res.status(400).send(err.errors[0]);
    });
});

router.delete('/:id', (req, res) => {
  // TODO log username and metadata into seperate log file

  return User
    .destroy({where: {id: req.params.id}})
    .then(count => {
      var status = count === 1 ? 200 : 500;
      res.sendStatus(status);
    });
});

export default router;
