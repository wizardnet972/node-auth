const jwt = require('jsonwebtoken');
const express = require('express');
const crypt = require('../../utils/crypt');
const UserModel = require('../db/user');
const User = UserModel.User;
const router = express.Router();

router.get('/', (req, res) => {
    res.send({});
})

router.use('/users', require('./users'));
router.use('/user', require('./user'));

router.post('/signup', (req, res) => {

    crypt
        .cryptPassword(req.body.password)
        .then(hash => {

            let user = new User(Object.assign({}, req.body, { password: hash }));

            user.save()
                .then(user => {
                    console.log('User created successfully.');
                    res.status(201).json({ userId: user.id });
                })
                .catch(err => {
                    res.status(500).json(err);
                });

        }).catch(err => {
            res.status(500).json(err);
        })
});

router.post('/login', (req, res) => {

    User.findOne({ email: req.body.email })
        .then(user => {

            if (!user) {
                res.status(400).send({ error: "User not found." });
                return;
            }

            crypt
                .comparePassword(req.body.password, user.password)
                .then(() => {

                    let token = jwt.sign({ userId: user.id }, req.app.get('secret'), {
                        expiresIn: req.app.get('expiresToken')
                    });

                    res.json({
                        user: UserModel.normalize(user),
                        token: token
                    });
                })
                .catch(error => {
                    console.error('error on login', error);
                    res.status(400).send({ error: "Worng password" });
                });
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

module.exports = router;
