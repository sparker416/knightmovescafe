/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("PricingController", PricingController);

    function PricingController($location) {
        var vm = this;
        vm.$location = $location;
    }
})();