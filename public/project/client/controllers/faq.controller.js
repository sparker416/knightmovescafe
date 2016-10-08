/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("FAQController", FAQController);

    function FAQController($location) {
        var vm = this;
        vm.$location = $location;
    }
})();