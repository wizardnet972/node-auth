const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: false, default: null },
    bio: { type: String, required: false, default: '' },
    createdAt: { type: Date, default: Date.now },
    admin: { type: Boolean, default: false }
});

UserSchema.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = {
    User: mongoose.model('User', UserSchema),
    normalize: (user) => {
        return {
            id: user.id,
            name: user.name,
            bio: user.bio,
            createdAt: user.createdAt
        }
    },
    update: (user, newUser) => {
        delete newUser.createdAt;
        delete newUser.password;
        delete newUser.id;

        return Object.assign(user, newUser);
    }
}
