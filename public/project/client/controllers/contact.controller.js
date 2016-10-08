/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("ContactController", ContactController);

    function ContactController($location, MailService) {
        var vm = this;
        vm.$location = $location;

        vm.mail = mail;

        function mail(name, email, message){
            MailService.mail(name, email, message);

            vm.contactForm = {};
            vm.contactName = "";
            vm.contactEmail = "";
            vm.contactMessage = "";

            vm.contactForm.$setPristine();
            vm.contactForm.$setUntouched();
        }
    }
})();