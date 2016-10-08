/**
 * Created by spark on 3/24/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        var vm = this;

        vm.currentUser = UserService.getCurrentUser();

        vm.$location = $location;
        vm.logout = logout;

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();