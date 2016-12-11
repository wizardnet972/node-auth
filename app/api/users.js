const express = require('express');
const User = require('../db/user');
const AuthorizeRequire = require('../../utils/authorize');

const router = express.Router();

AuthorizeRequire(router);

router.get('/', (req, res) => {

    User
        .find({})
        .then(users => {
            res.json(users);
        });
});

router
    .route('/:userId')
    .get((req, res) => {
        User
            .findById(req.params.userId)
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .put((req, res) => {
        User
            .findById(req.params.userId)
            .then(user => {
                user.name = req.body.name;
                user.save()
                    .then(user => {
                        res.json({ userId: user.id });
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    });
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .delete((req, res) => {
        User
            .remove({
                _id: req.params.userId
            })
            .then(() => {
                res.json({ delete: true });
            })
            .catch(err => {
                res.status(500).send(err);
            })
    });


module.exports = router;

