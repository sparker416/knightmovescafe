/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("UpdateController", UpdateController);

    function UpdateController(UserService, $location, $rootScope) {
        var vm = this;

        vm.error = null;
        vm.message = null;

        vm.currentUser = UserService.getCurrentUser();
        if (!vm.currentUser) {
            $location.url("/home");
        }

        vm.profileUpdate = profileUpdate;

        function profileUpdate (user) {
            // same validation as register
            vm.error = null;
            vm.message = null;

            var updatedEmail;
            if(user.email){
                updatedEmail=user.email;
            } else {
                updatedEmail=vm.currentUser.email;
            }

            var updatedUsername;
            if(user.username){
                updatedUsername=user.username;
            } else {
                updatedUsername=vm.currentUser.username;
            }

            var updatedPassword;
            if(user.password && (user.password==user.confirmPassword)){
                updatedPassword=user.password;
            } else {
                updatedPassword=vm.currentUser.password;
                vm.error = "Password not updated.";
            }

            var updatedUser = {
                email: updatedEmail,
                username: updatedUsername,
                password: updatedPassword,
                games: vm.currentUser.games,
                roles: vm.currentUser.roles
            };

            UserService
                .updateUser(vm.currentUser._id, updatedUser)
                .then(function (response) {
                    if (response.data) {
                        vm.currentUser = response.data;
                        vm.message = "User updated successfully";
                        $rootScope.$broadcast("updateCurrentUser");
                    } else {
                        vm.error = "Unable to update the user";
                    }
                });
        }
    }
})();