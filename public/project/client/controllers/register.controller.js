/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope) {
        var vm = this;

        vm.message = null;
        vm.register = register;

        function register(user) {
            vm.message = null;
            if (user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                vm.message = "Please provide a password";
                return;
            }

            if (user.password != user.password2) {
                vm.message = "Passwords must match";
                return;
            }
            
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response){
                    if (!response.data) {
                        vm.message = "User already exists or was not found";
                        if(vm.message){
                            window.setTimeout(function(){
                                $location.url("/login");

                            }, 5000);
                        }
                    }
                });

            var newUser = {
                email: user.email,
                username: user.username,
                password: user.password,
                games: [],
                roles: ["player"]
            };

            UserService
                .createUser(newUser)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    $rootScope.$broadcast("updateCurrentUser");
                    $location.url("/profile");
                });
        }
    }
})();