/**
 * Created by spark on 4/4/2016.
 */
(function()
{
    angular
        .module("KnightMovesApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http)
    {
        var model = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            isAdmin: isAdmin,
            isOwner: isOwner,
            findAllUsers: findAllUsers,
            findAllGamesForUser: findAllGamesForUser,
            addGame: addGame,
            createUser: createUser,
            register: register,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername
        };
        return model;

        function setCurrentUser(user)
        {
            $rootScope.currentUser = user;
        }

        function getCurrentUser()
        {
            return $rootScope.currentUser;
        }

        function isAdmin(){
            return $http.get("/api/project/isAdmin");
        }

        function isOwner(){
            return $http.get("/api/project/isOwner");
        }
        /*
        function findUserByCredentials(username, password)
        {
            return $http.get("/rest/api/project/user?username=" + username + "&password=" + password);
        }
*/
        function findAllUsers()
        {
            return $http.get("/api/project/user");
        }

        function findAllGamesForUser(userId)
        {
            return $http.get("/rest/api/project/user/" + userId + "/game");
        }
        
        function addGame(userId, gameName)
        {
            return $http.post("/rest/api/project/user/" + userId + "/game", {"name": gameName});
        }

        function createUser(user)
        {
            return $http.post("/api/project/user", user);
        }

        function register(user)
        {
            return $http.post("/api/project/register", user);
        }

        function deleteUserById(userId)
        {
            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId, user)
        {
            return $http.put("/api/project/user/" + userId, user);
        }

        /*
        function findUserById(userId)
        {
            return $http.get("/rest/api/project/user/" + userId);
        }

        function findUserByUsername(name)
        {
            return $http.get("/rest/api/project/user?username=" + name);
        }
        */
    }
})();