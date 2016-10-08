/**
 * Created by spark on 4/1/2016.
 */

(function(){
    angular
        .module("KnightMovesApp")
        .controller("LibraryController", LibraryController);

    function LibraryController($location, UserGameService, $rootScope) {
        var vm = this;

        vm.$location = $location;

        UserGameService
            .findAllGames()
            .then(function(response) {
                vm.allGames = response.data;
            });


        vm.goToDetails = goToDetails;

        function goToDetails(game)
        {
            UserGameService.findGameById(game._id)
                .then(function(response){
                    UserGameService.setCurrentGame(response.data);
                    $rootScope.$broadcast("updateCurrentGame");
                    $location.url("/detail");
                });
        }
    }
})();