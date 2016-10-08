/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("AboutController", AboutController);

    function AboutController($location) {
        var vm = this;

        vm.$location = $location;
    }
})();