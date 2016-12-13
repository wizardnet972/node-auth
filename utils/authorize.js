const jwt = require('jsonwebtoken');

function authorize(router, secret) {

    router.use((req, res, next) => {

        const token = req.body.token || req.headers['x-access-token'];

        if (!token) {
            return res.status(403).send({ message: 'invalid token' });
        }

        jwt.verify(token, secret || req.app.get('secret'), (err, payload) => {

            if (err) {
                return res.sendStatus(401);
            }

            req.payload = payload;
            next();
        });
    });
}

module.exports = authorize;