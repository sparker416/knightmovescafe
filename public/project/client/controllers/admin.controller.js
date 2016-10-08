/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("AdminController", AdminController);

    function AdminController($location, UserGameService, $rootScope, UserService) {
        var vm = this;

        vm.$location = $location;
        vm.currentUser = UserService.getCurrentUser();
        vm.isAdmin = UserService.isAdmin();

        if(!vm.isAdmin){
            $location.url("/home");
        }

        vm.addGame = addGame;
        vm.editGame = editGame;
        vm.deleteGame = deleteGame;
        vm.selectGame = selectGame;

        UserGameService
            .findAllGames()
            .then(function(response) {
                vm.allGames = response.data;
            });

        $rootScope.$on("updateCurrentGame", function(){
            vm.currentGame = UserGameService.getCurrentGame();
        });

        $rootScope.$on("updateAllGames", function(){
            UserGameService
                .findAllGames()
                .then(function(response) {
                    vm.allGames = response.data;
                });
        });


        function addGame(game)
        {
            var newGame = {
                Name: game.Name,
                Picture: game.Picture,
                Description: game.Description,
                Min_Num_of_Players: game.Min_Num_of_Players,
                Max_Num_of_Players: game.Max_Num_of_Players,
                Min_Playing_Time: game.Min_Playing_Time,
                Max_Playing_Time: game.Max_Playing_Time,
                Min_Age: game.Min_Age,
                Max_Age: game.Max_Age,
                Co_op: game.Co_op,
                Strategy: game.Strategy,
                Party: game.Party,
                Classic: game.Classic,
                Worker_placement: game.Worker_placement,
                Resource_management: game.Resource_management,
                Deck_building: game.Deck_building,
                Coolidge_Corner: game.Coolidge_Corner,
                Teele_Square: game.Teele_Square,
                Players: []
            };
            UserGameService.addGame(newGame)
                .then(function(response){
                    UserGameService.setCurrentGames(response.data);
                    UserGameService.setCurrentGame(null);
                    vm.game = null;
                    $rootScope.$broadcast("updateAllGames");
                    $rootScope.$broadcast("updateCurrentGame");
                });
        }

        function editGame(currentId, game)
        {
            var updatedGame = {
                Name: game.Name,
                Picture: game.Picture,
                Description: game.Description,
                Min_Num_of_Players: game.Min_Num_of_Players,
                Max_Num_of_Players: game.Max_Num_of_Players,
                Min_Playing_Time: game.Min_Playing_Time,
                Max_Playing_Time: game.Max_Playing_Time,
                Min_Age: game.Min_Age,
                Max_Age: game.Max_Age,
                Co_op: game.Co_op,
                Strategy: game.Strategy,
                Party: game.Party,
                Classic: game.Classic,
                Worker_placement: game.Worker_placement,
                Resource_management: game.Resource_management,
                Deck_building: game.Deck_building,
                Coolidge_Corner: game.Coolidge_Corner,
                Teele_Square: game.Teele_Square,
                Players: game.Players
            };
            UserGameService
                .editGame(currentId, updatedGame)
                .then(function(response){
                    console.log(response.data);
                    UserGameService.setCurrentGames(response.data);
                    UserGameService.setCurrentGame(null);
                    vm.game = null;
                    $rootScope.$broadcast("updateAllGames");
                    $rootScope.$broadcast("updateCurrentGame");
                });
        }

        function deleteGame(game)
        {
            var gameId = game._id;
            UserGameService.deleteGameById(gameId)
                .then(function(response){
                    UserGameService.setCurrentGames(response.data);
                    UserGameService.setCurrentGame(null);
                    vm.game = null;
                    $rootScope.$broadcast("updateAllGames");
                    $rootScope.$broadcast("updateCurrentGame");
                });
        }

        function selectGame(game)
        {
            UserGameService.findGameById(game._id)
                .then(function(response){
                    vm.currentGame = response.data;
                    vm.game = vm.currentGame;
                    UserGameService.setCurrentGame(vm.currentGame);
                    $rootScope.$broadcast("updateCurrentGame");
                });
        }
    }
})();