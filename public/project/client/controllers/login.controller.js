/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location, $rootScope) {
        var vm = this;

        vm.$location = $location;
        vm.message = null;
//        vm.login = login;

        $rootScope.$on("updateCurrentUser", function(){
            vm.currentUser = UserService.getCurrentUser();
        });

        /*
        function login (username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                        $rootScope.$broadcast("updateCurrentUser");
                    } else {
                        vm.message = "User not found.";
                        $location.url("/login");
                    }
                });
        }
        */
    }
})();