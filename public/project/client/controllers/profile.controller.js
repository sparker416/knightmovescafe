/**
 * Created by spark on 4/1/2016.
 * */

(function(){
    angular
        .module("KnightMovesApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, UserGameService, $rootScope) {
        var vm = this;

        vm.currentUser = UserService.getCurrentUser();
        vm.error = null;

        if (!vm.currentUser) {
            $location.url("/home");
        }

        $rootScope.$on("updateCurrentUser", function(){
            vm.currentUser = UserService.getCurrentUser();
        });

        UserService
            .findAllGamesForUser(vm.currentUser._id)
            .then(function(response){
                vm.userGames = response.data;
            });

        $rootScope.$on("updateUserGames", function(){
            UserService
                .findAllGamesForUser(vm.currentUser._id)
                .then(function(response){
                    vm.userGames = response.data;
                });
        });



        vm.addGameForUser = addGameForUser;
        vm.removeGameForUser = removeGameForUser;
        vm.selectGame = selectGame;

        function addGameForUser(userId, gameName){
            UserGameService.findGameByName(gameName)
                .then(function(response){
                    if(response.data){
                        vm.error = null;
                        var game = response.data;
                        UserGameService
                            .addUserToGame(userId, game._id)
                            .then(function(response){
                                console.log(response.data);
                            });

                        UserService.addGame(userId, gameName)
                            .then(function(response){
                                vm.userGames = response.data;
                                $rootScope.$broadcast("updateUserGames");
                            });
                    }
                    else {
                        vm.error = "Game does not exist in database.";
                    }
                });
        }

        function removeGameForUser(game){
            UserGameService
                .deleteUserFromGame(vm.currentUser._id, game._id)
                .then(function(response){
                    UserGameService.setCurrentGames(response.data);
                    $rootScope.$broadcast("updateUserGames");
                })
        }

        function selectGame(game){
            UserGameService.findGameById(game._id)
                .then(function(response){
                    vm.currentGame = response.data;
                });
        }
    }
})();
