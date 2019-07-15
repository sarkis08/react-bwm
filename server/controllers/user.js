const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

// User Login / Authentication
exports.auth = function(req, res) {
    const { email, password } = req.body;

    if (!password || !email) {
        return res.status(422).send({errors: [{title: 'Data missing', detail: 'PRovide email and passworld!'}]});
    }

    User.findOne({email}, function(err, user) {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if (!user) {
            return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'User does not exist'}]})
        }

        if (user.hasStatePassword(password)) {

            // return JWT token
            const token = jwt.sign({
                userId: user.id,
                username: user.username
              }, config.SECRET, { expiresIn: '1h'});

              return res.json(token);
                 
        } else {
            return res.status(422).send({errors: [{title: 'Wrong Data', detail: 'Wrong email or password'}]})
        }
    })
}


// Registration
exports.register = function(req, res) {
    const { username, email, password, passwordConfirmation } = req.body

    if (!password || !email) {
        return res.status(422).send({errors: [{
            title: 'Data missing',
            detail: 'Provide email and password!'
        }]});
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send({errors: [{
            title: 'Invalid password',
            detail: 'Password did not match!'
        }]});
    }

    User.findOne({email}, function(err, existingUser) {
        if (err) {
            return res.status(422).send({
                errors: normalizeErrors(err.errors)
            });
        }

        if (existingUser) {
            return res.status(422).send({errors: [{
                title: 'Invalid email',
                detail: 'Email already in used!'
            }]});
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save((err) => {
            if (err) {
                return res.status(422).send({
                    errors: normalizeErrors(err.errors)
                });
            }

            return res.json({'registerd': true});
        })
    });

    // res.json({username, email})
}

// Auth Middleware
exports.authMiddleware = function(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const user = parseToken(token);

        User.findById(user.userId, function(err, user) {
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            if (user) {
                res.locals.user = user;
                next();
            } else {
                return notAuthorized(res);
            }
        })
    } else {
        return notAuthorized(res);
    }
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res) {
    return res.status(401).send({errors: [{
        title: 'Not authorized!',
        detail: 'You need to login to get access!'
    }]});
}