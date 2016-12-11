const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../db/user');
const crypt = require('../../utils/crypt');

const router = express.Router();

router.use('/users', require('./users'));

router.post('/signup', (req, res) => {

    crypt
        .cryptPassword(req.body.password)
        .then(hash => {

            const user = new User({
                name: req.body.name,
                password: hash,
                admin: true
            });

            user.save()
                .then(() => {
                    console.log('User created successfully.');
                    res.status(201).json({ userId: user.id });
                })
                .catch(err => {
                    throw err;
                });
           
        }).catch(err => {
            res.status(500).json({ message: "Signup failed." });
        })
});

router.post('/login', (req, res) => {

    User.findOne({ name: req.body.name })
        .then(user => {

            if (!user) {
                res.status(400).send({ error: "User not found." });
                return;
            }

            crypt
                .comparePassword(req.body.password, user.password)
                .then(() => {

                    let token = jwt.sign(user, req.app.get('secret'), {
                        expiresIn: req.app.get('expiresToken')
                    });

                    res.json({
                        user: {
                            id: user.id,
                            name: user.name
                        },
                        token: token
                    });
                })
                .catch(error => {
                    console.error('error on login', error);

                    res.status(400).send({ error: "Worng password" });
                });
        })
        .catch(err => {
            throw err;
        })
});

module.exports = router;
