const express = require('express');
const Authorize = require('../../utils/authorize');
const UserModel = require('../db/user');
const User = UserModel.User;
const router = express.Router();

Authorize(router);

router.get('/', (req, res) => {

    User.find({})
        .then(users => {
            res.json({
                users: users.map(user => UserModel.normalize(user))
            });
        });
});

router
    .route('/:userId')

    .get((req, res) => {

        User.findById(req.params.userId)
            .then(user => {
                if (!user) { res.sendStatus(404); return; }

                res.json(UserModel.normalize(user));
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })

    .put((req, res) => {

        User.findById(req.params.userId)
            .then(user => {
                if (!user) { res.sendStatus(404); return; }

                UserModel.update(user, req.body)
                    .save()
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

        User.remove({ _id: req.params.userId })
            .then(() => {
                res.json({ delete: true });
            })
            .catch(err => {
                res.status(500).send(err);
            });
    });

module.exports = router;
