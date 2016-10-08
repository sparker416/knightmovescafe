/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("HomeController", HomeController);

    function HomeController($location) {
        var vm = this;

        vm.$location = $location;
    }
})();