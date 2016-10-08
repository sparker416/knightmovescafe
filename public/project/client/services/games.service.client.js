/*
 * Created by spark on 4/4/2016.
*/

(function()
{
    angular
        .module("KnightMovesApp")
        .factory("UserGameService", UserGameService);

    function UserGameService($rootScope, $http)
    {
        var model = {
            getCurrentGames: getCurrentGames,
            setCurrentGames: setCurrentGames,
            getCurrentGame: getCurrentGame,
            setCurrentGame: setCurrentGame,
            findAllGames: findAllGames,
            addGame: addGame,
            addUserToGame: addUserToGame,
            deleteGameById: deleteGameById,
            deleteUserFromGame: deleteUserFromGame,
            findGameByName: findGameByName,
            findGameById: findGameById,
            editGame: editGame
        };
        return model;

        function getCurrentGames()
        {
            return $rootScope.currentGames;
        }

        function setCurrentGames(games)
        {
            $rootScope.currentGames = games;
        }

        function getCurrentGame()
        {
            return $rootScope.currentGame;
        }

        function setCurrentGame(game)
        {
            $rootScope.currentGame = game;
        }

        function findAllGames()
        {
            return $http.get("/rest/api/KM/game");
        }

        function addGame(game) {
            return $http.post("/rest/api/KM/admin/game", game);
        }

        function addUserToGame(userId, gameId){
            return $http.get("/rest/api/KM/user/" + userId + "/game/" + gameId);
        }

        function findGameByName(gameName){
            return $http.get("/rest/api/KM/game/" + gameName);
        }

        function deleteGameById(gameId)
        {
            return $http.delete("/rest/api/KM/admin/game/" + gameId);
        }

        function deleteUserFromGame(userId, gameId){
            return $http.delete("/rest/api/KM/user/" + userId + "/game/" + gameId);
        }

        function findGameById(gameId)
        {
            return $http.get("/rest/api/KM/game/" + gameId);
        }

        function editGame(gameId, game)
        {
            return $http.put("/rest/api/KM/admin/game/" + gameId, game);
        }
    }
})();