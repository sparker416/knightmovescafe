module.exports = function(app, model) {
    app.get("/rest/api/KM/game", function(req, res){
        model.getAllGames()
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.get("/rest/api/KM/game/:gameId", function(req, res){
        if (isNaN(req.params.gameId)) {
            var gameTitle = req.params.gameId;
            model.getGameByName(gameTitle)
                .then(function(doc){
                    res.json(doc);
                }, function(err){
                    res.status(400).send(err);
                });
        } else {
            var gameId = req.params.gameId;
            model.getGameById(gameId)
                .then(function(doc){
                    res.json(doc);
                }, function(err){
                    res.status(400).send(err);
                });
        }
    });

    app.delete("/rest/api/KM/admin/game/:gameId", function(req, res){
        var gameId = req.params.gameId;
        model.deleteGame(gameId)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.post("/rest/api/KM/admin/game", function(req, res){
        var game = req.body;
        model.createGame(game)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.put("/rest/api/KM/admin/game/:gameId", function(req, res){
        var gameId = req.params.gameId;
        var game = req.body;
        model.editGame(gameId, game)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });
    
    app.get("/rest/api/KM/user/:userId/game/:gameId", function (req, res){
        var userId = req.params.userId;
        var gameId = req.params.gameId;
        model.addUserToGame(userId, gameId)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.delete("/rest/api/KM/user/:userId/game/:gameId", function (req, res){
        var userId = req.params.userId;
        var gameId = req.params.gameId;
        model.deleteUserFromGame(userId, gameId)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    })
};