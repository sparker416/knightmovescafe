/**
 * Created by spark on 4/30/2016.
 */
var q = require("q");

module.exports = function(db, mongoose) {
    var GameSchema = require("./game.schema.js")(mongoose);

    var Game = mongoose.model("Game", GameSchema);

    var api = {
        createGame: createGame,
        addUserToGame: addUserToGame,
        getAllGames: getAllGames,
        getGameById: getGameById,
        getGameByName: getGameByName,
        editGame: editGame,
        deleteGame: deleteGame,
        deleteUserFromGame: deleteUserFromGame
    };
    return api;

    function createGame(game){
        var deferred = q.defer();

        Game.create(game, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function addUserToGame(userId, gameId){
        var game = getGameById(gameId);

        for(var i=0; i<game.Players.length; i++){
            if(!(game.Players[i] == userId)){
                game.Players.push(userId);
            }
        }

        return game;
    }

    function getAllGames(){
        var deferred = q.defer();

        Game.find({}, function(err, data){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    }

    function getGameById(gameId){
        var deferred = q.defer();

        Game.findById({_id: gameId},
            function(err, data){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }
            });

        return deferred.promise;
    }

    function getGameByName(gameName){
        var deferred = q.defer();

        Game.findOne({Name: gameName}, function(err, data){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    }

    function editGame(gameId, updatedGame){
        var deferred = q.defer();

        Game.findByIdAndUpdate(gameId,
            {
                Name: updatedGame.Name,
                Picture: updatedGame.Picture,
                Description: updatedGame.Description,
                Min_Num_of_Players: updatedGame.Min_Num_of_Players,
                Max_Num_of_Players: updatedGame.Max_Num_of_Players,
                Min_Playing_Time: updatedGame.Min_Playing_Time,
                Max_Playing_Time: updatedGame.Max_Playing_Time,
                Min_Age: updatedGame.Min_Age,
                Max_Age: updatedGame.Max_Age,
                Co_op: updatedGame.Co_op,
                Strategy: updatedGame.Strategy,
                Party: updatedGame.Party,
                Classic: updatedGame.Classic,
                Worker_placement: updatedGame.Worker_placement,
                Resource_management: updatedGame.Resource_management,
                Deck_building: updatedGame.Deck_building,
                Coolidge_Corner: updatedGame.Coolidge_Corner,
                Teele_Square: updatedGame.Teele_Square,
                Players: updatedGame.Players
            },
            function(err, data){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }
            });

        return deferred.promise;
    }

    function deleteGame(gameId){
        var deferred = q.defer();

        Game.findByIdAndRemove(gameId,
            Game.find({}, function(err, data){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }
            }));
        return deferred.promise;
    }

    function deleteUserFromGame(userId, gameId){
        var game = getGameById(gameId);

        for(var i=0; i<game.Players.length; i++){
            if(game.Players[i] == userId){
                game.Players.splice(i, 1);
            }
        }

        return game;
    }
};