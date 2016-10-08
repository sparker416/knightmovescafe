/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("NewsController", NewsController);

    function NewsController($location) {
        var vm = this;
        vm.$location = $location;
    }
})();