/**
 * Created by spark on 4/30/2016.
 */
var q = require("q");

module.exports = function(db, mongoose) {
    var UserSchema = require("./user.schema.js")(mongoose);

    var ProjectUser = mongoose.model("ProjectUser", UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findAllGamesForUser: findAllGamesForUser,
        addGame: addGame,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId
    };
    return api;

    function createUser(newUser){
        var deferred = q.defer();

        ProjectUser.create(newUser, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();

        ProjectUser.find({}, function(err, data){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        ProjectUser.findById({_id: userId},
            function(err, data){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }
            });

        return deferred.promise;
    }

    function findAllGamesForUser(userId){
        var deferred = q.defer();

        ProjectUser.findById(userId, function(err, user)
        {
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
            return deferred.promise;
        })
            .then(function(user) {
                return user.games
            });
    }

    function addGame(userId, gameName)
    {
        var deferred = q.defer();

        ProjectUser.findById(userId, function(err, user){
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
            return deferred.promise;
        })
            .then(function(user){
                console.log(user.games);

                for(var g=0; g<user.games.length; g++) {
                    if(user.games[g].name == gameName){
                        user.games[g].timesPlayed++;
                        user.games[g].dateLastPlayed = new Date().now;
                    } else {
                        user.games.push({name: gameName, dateLastPlayed: new Date().now, timesPlayed: 1});
                    }
                }
                return user.games;
            });
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        ProjectUser.findByIdAndUpdate(userId,
            {
                email: user.email,
                username: user.username,
                password: user.password,
                games: user.games,
                roles: user.roles
            },
            function(err, user){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();

        ProjectUser.findByIdAndRemove(userId,
            ProjectUser.find({}, function(err, data){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }
            }));
        return deferred.promise;
    }

    function findUserByUsername(usrnm) {
        var deferred = q.defer();

        ProjectUser.findOne({username: usrnm}, function(err, data){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        ProjectUser.findOne(
            { username: credentials.username,
                password: credentials.password },

            function(err, data){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }
            });
        return deferred.promise;
    }

    function findUserByFacebookId(facebookId) {
        var deferred = q.defer();

        return ProjectUser.findOne({'facebook.id': facebookId},
            function(err, data) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }

                return deferred.promise;
            });
    }

    function findUserByGoogleId(googleId) {
        var deferred = q.defer();

        return ProjectUser.findOne({'google.id': googleId},
            function(err, data) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }

                return deferred.promise;
            });
    }
};