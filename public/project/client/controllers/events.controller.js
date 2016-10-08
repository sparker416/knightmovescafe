/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("EventsController", EventsController);

    function EventsController($location) {
        var vm = this;
        vm.$location = $location;
    }
})();