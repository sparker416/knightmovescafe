/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("OwnerController", OwnerController);

    function OwnerController($location, UserService, $rootScope) {
        var vm = this;

        vm.$location = $location;
        vm.currentUser = UserService.getCurrentUser();

        vm.isOwner = UserService.isOwner(vm.currentUser);

        if(!vm.isOwner){
            $location.url("/home");
        }

        vm.selectedUser = null;

        UserService.findAllUsers()
            .then(function(response){
                vm.allUsers = response.data;
            });

        $rootScope.$on("refreshUsers", function(){
            UserService.findAllUsers()
                .then(function(response){
                    vm.allUsers = response.data;
                    vm.selectedUser = null;
                    vm.newUser = null;
                });
        });

        vm.addUser = addUser;
        vm.editUser = editUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;

        function addUser(user)
        {
            var newRoles = [];

            if(vm.newUser.player){
                newRoles.push("player")
            } if(vm.newUser.admin){
                newRoles.push("admin")
            } if(vm.newUser.owner){
                newRoles.push("owner")
            }

            var newUser = {
                email: user.email,
                username: user.username,
                password: user.password,
                games: [],
                roles: newRoles
            };

            UserService.createUser(newUser)
                .then(function(response){
                    vm.allUsers = response.data;
                    vm.selectedUser = null;
                    $rootScope.$broadcast("refreshUsers");
                });
        }

        function editUser(userId, user)
        {
            var newRoles = [];

            if(vm.newUser.player){
                newRoles.push("player")
            } if(vm.newUser.admin){
                newRoles.push("admin")
            } if(vm.newUser.owner){
                newRoles.push("owner")
            }

            var updatedUser = {
                _id: user._id,
                email: user.email,
                username: user.username,
                password: user.password,
                games: user.games,
                roles: newRoles
            };

            UserService.updateUser(userId, updatedUser)
                .then(function(response){
                    vm.allUsers = response.data;
                    vm.selectedUser = null;
                    $rootScope.$broadcast("refreshUsers");
                });
        }

        function deleteUser(user)
        {
            var userId = user._id;
            UserService.deleteUserById(userId)
                .then(function(response){
                    vm.allUsers = response.data;
                    vm.selectedUser = null;
                    $rootScope.$broadcast("refreshUsers");
                });
        }

        function selectUser(user)
        {
            UserService.findUserById(user._id)
                .then(function(response){
                    vm.selectedUser = response.data;
                    vm.newUser = vm.selectedUser;
                });
        }
    }
})();