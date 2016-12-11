const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();

function authorize(router, secret) {

    router.use((req, res, next) => {

        const token = req.body.token || req.headers['x-access-token'];

        if (!token) {
            return res.status(403).send({ message: 'invalid token' });
        }

        jwt.verify(token, secret || req.app.get('secret'), (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'unauthorized' });
            }

            req.decoded = decoded;
            next();
        });
    });

}

module.exports = authorize;

