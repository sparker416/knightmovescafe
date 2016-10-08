var passport = require("passport");
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app, model) {
    var auth = authorized;
    app.post  ('/api/project/logout',         logout);
    app.post  ('/api/project/register',       register);
    app.post  ('/api/project/user',     auth, createUser);
    app.get   ('/api/project/loggedin',       loggedin);
    app.get   ('/api/project/user',     auth, findAllUsers);
    app.put   ('/api/project/user/:id', auth, updateUser);
    app.delete('/api/project/user/:id', auth, deleteUser);

    app.get("/api/project/isAdmin", function(req, res)
    {
        if(req.isAuthenticated())
        {
            var user = req.user;
            var username = user.username;
            model.findUserByUsername(username)
                .then(
                    function(foundUser) {
                        if (foundUser) {
                            var roles = foundUser.roles;
                            var isAdmin = (roles.indexOf("admin") > -1);
                            if (isAdmin) {
                                res.json(foundUser);
                            } else {
                                res.send('0');
                            }
                        }
                    }, function(err){
                        res.send('0');
                    })
        } else {
            res.send('0');
        }
    });

    app.get("/api/project/isOwner", function(req, res)
    {
        if(req.isAuthenticated())
        {
            var user = req.user;
            var username = user.username;
            model.findUserByUsername(username)
                .then(
                    function(foundUser) {
                        if (foundUser) {
                            var roles = foundUser.roles;
                            var isOwner = (roles.indexOf("owner") > -1);
                            if (isOwner) {
                                res.json(foundUser);
                            } else {
                                res.send('0');
                            }
                        }
                    }, function(err){
                        res.send('0');
                    })
        } else {
            res.send('0');
        }
    });

    app.get   ('/auth/facebook/login', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: 'http://localhost:3000/project/client/index.html#/profile',
            failureRedirect: 'http://localhost:3000/project/client/index.html#/login'
        }));

    app.get   ('/auth/google/login', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get   ('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: 'http://localhost:3000/project/client/index.html#/profile',
            failureRedirect: 'http://localhost:3000/project/client/index.html#/login'
        }));

    var googleConfig = {
        clientID        : process.env.GOOGLE_APP_ID,
        clientSecret    : process.env.GOOGLE_APP_SECRET,
        callbackURL     : "http://localhost:3000/auth/google/callback"
    };

    var facebookConfig = {
        clientID        : process.env.FACEBOOK_APP_ID,
        clientSecret    : process.env.FACEBOOK_APP_SECRET,
        callbackURL     : "http://localhost:3000/auth/facebook/callback"
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function facebookStrategy(token, refreshToken, profile, done) {
        model
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        model
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newGoogleUser = {
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            google: {
                                id:          profile.id,
                                token:       token
                            }
                        };
                        return model.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['player'];

        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return model.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        if(isAdmin(req.user)) {
            model
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function deleteUser(req, res) {
        if(isAdmin(req.user)) {

            model
                .deleteUser(req.params.id)
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function updateUser(req, res) {
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        model
            .updateUser(req.params.id, newUser)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["player"];
        }

        // first check if a user already exists with the username
        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return model.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return model.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return model.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true;
        }
        return false;
    }

    function isOwner(user) {
        if(user.roles.indexOf("owner") > 0) {
            return true;
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};