/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("DirectionsController", DirectionsController);

    function DirectionsController($location) {
        var vm = this;
        vm.$location = $location;
    }
})();