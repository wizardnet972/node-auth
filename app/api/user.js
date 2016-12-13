const express = require('express');
const Authorize = require('../../utils/authorize');
const UserModel = require('../db/user');
const User = UserModel.User;
const router = express.Router();

Authorize(router);

router
    .get('/', (req, res) => {
        User.findById(req.payload.userId)
            .then(user => {
                if (!user) { res.send(404); return; }

                res.json({ user: UserModel.normalize(user) });
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })

    .put('/', (req, res) => {
        User.findById(req.payload.userId)
            .then(user => {
                if (!user) { res.send(404); return; }

                UserModel.update(user, req.body)
                    .save()
                    .then(user => {
                        res.json({ user: UserModel.normalize(user) });
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    });
            })
            .catch(err => {
                res.status(500).send(err);
            });
    });

module.exports = router;
