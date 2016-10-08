(function(){
    angular
        .module("KnightMovesApp")
        .controller("DetailController", DetailController);

    function DetailController(UserService, UserGameService, $rootScope, $location) {
        var vm = this;

        vm.$location = $location;
        vm.currentUser = UserService.getCurrentUser();
        vm.currentGame = UserGameService.getCurrentGame();

        $rootScope.$on("updateCurrentGame", function(){
            vm.currentGame = UserGameService.getCurrentGame();
        });
    }
})();
