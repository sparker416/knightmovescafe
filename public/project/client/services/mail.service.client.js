/**
 * Created by spark on 4/4/2016.
 */
(function()
{
    angular
        .module("KnightMovesApp")
        .factory("MailService", MailService);

    function MailService($http)
    {
        var model = {
            mail: mail
        };
        return model;

        function mail(name, email, message){
            $http.post('/mail', {name: name, email:email, msg: message});
        }
    }
})();