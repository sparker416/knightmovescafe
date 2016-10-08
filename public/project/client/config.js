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
                templateUrl: "views/home.view.html",
                controller: "HomeController as controller"
            })
            .when("/about", {
                templateUrl: "views/about.view.html",
                controller: "AboutController as controller"
            })
            .when("/contact", {
                templateUrl: "views/contact.view.html",
                controller: "ContactController as controller"
            })
            .when("/directions", {
                templateUrl: "views/directions.view.html",
                controller: "DirectionsController as controller"
            })
            .when("/events", {
                templateUrl: "views/events.view.html",
                controller: "EventsController as controller"
            })
            .when("/faq", {
                templateUrl: "views/faq.view.html",
                controller: "FAQController as controller"
            })
            .when("/library", {
                templateUrl: "views/library.view.html",
                controller: "LibraryController as controller"
            })
            .when("/login", {
                templateUrl: "views/login.view.html",
                controller: "LoginController as controller"
            })
            .when("/news", {
                templateUrl: "views/news.view.html",
                controller: "NewsController as controller"
            })
            .when("/pricing", {
                templateUrl: "views/pricing.view.html",
                controller: "PricingController as controller"
            })
            .when("/profile", {
                templateUrl: "views/profile.view.html",
                controller: "ProfileController as controller",
                resolve: {
                    loggedin : checkLoggedIn
                }
            })
            .when("/update", {
                templateUrl: "views/update.view.html",
                controller: "UpdateController as controller",
                resolve: {
                    loggedin : checkLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "views/register.view.html",
                controller: "RegisterController as controller"
            })
            .when("/search", {
                templateUrl: "views/search.view.html",
                controller: "SearchController as controller"
            })
            .when("/admin", {
                templateUrl: "views/admin.view.html",
                controller: "AdminController as controller",
                resolve: {
                    isAdmin : checkIsAdmin
                }
            })
            .when("/owner", {
                templateUrl: "views/owner.view.html",
                controller: "OwnerController as controller",
                resolve: {
                    isOwner : checkIsOwner
                }
            })
            .when("/search", {
                templateUrl: "views/search.view.html",
                controller: "SearchController as controller"
            })
            .when("/detail", {
                templateUrl: "views/detail.view.html",
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