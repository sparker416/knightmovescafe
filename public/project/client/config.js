/**
 * Created by spark on 3/4/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "project/client/views/home.view.html",
                controller: "HomeController as controller"
            })
            .when("/about", {
                templateUrl: "project/client/views/about.view.html",
                controller: "AboutController as controller"
            })
            .when("/contact", {
                templateUrl: "project/client/views/contact.view.html",
                controller: "ContactController as controller"
            })
            .when("/directions", {
                templateUrl: "project/client/views/directions.view.html",
                controller: "DirectionsController as controller"
            })
            .when("/events", {
                templateUrl: "project/client/views/events.view.html",
                controller: "EventsController as controller"
            })
            .when("/faq", {
                templateUrl: "project/client/views/faq.view.html",
                controller: "FAQController as controller"
            })
            .when("/library", {
                templateUrl: "project/client/views/library.view.html",
                controller: "LibraryController as controller"
            })
            .when("/login", {
                templateUrl: "project/client/views/login.view.html",
                controller: "LoginController as controller"
            })
            .when("/news", {
                templateUrl: "project/client/views/news.view.html",
                controller: "NewsController as controller"
            })
            .when("/pricing", {
                templateUrl: "project/client/views/pricing.view.html",
                controller: "PricingController as controller"
            })
            .when("/profile", {
                templateUrl: "project/client/views/profile.view.html",
                controller: "ProfileController as controller",
                resolve: {
                    loggedin : checkLoggedIn
                }
            })
            .when("/update", {
                templateUrl: "project/client/views/update.view.html",
                controller: "UpdateController as controller",
                resolve: {
                    loggedin : checkLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "project/client/views/register.view.html",
                controller: "RegisterController as controller"
            })
            .when("/search", {
                templateUrl: "project/client/views/search.view.html",
                controller: "SearchController as controller"
            })
            .when("/admin", {
                templateUrl: "project/client/views/admin.view.html",
                controller: "AdminController as controller",
                resolve: {
                    isAdmin : checkIsAdmin
                }
            })
            .when("/owner", {
                templateUrl: "project/client/views/owner.view.html",
                controller: "OwnerController as controller",
                resolve: {
                    isOwner : checkIsOwner
                }
            })
            .when("/search", {
                templateUrl: "project/client/views/search.view.html",
                controller: "SearchController as controller"
            })
            .when("/detail", {
                templateUrl: "project/client/views/detail.view.html",
                controller: "DetailController as controller"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();

function checkLoggedIn($q, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get("/api/project/loggedin")
        .success(function(user){
            if(user != '0'){
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                $rootScope.currentUser = null;
                deferred.reject();
                $location.url("/login");
            }
        });
    return deferred.promise;
}

function checkIsAdmin($q, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get("/api/project/isAdmin")
        .success(function(user){
            if(user != '0'){
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url("/home");
            }
        });
    return deferred.promise;
}

function checkIsOwner($q, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get("/api/project/isOwner")
        .success(function(user){
            if(user != '0'){
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url("/home");
            }
        });
    return deferred.promise;
}