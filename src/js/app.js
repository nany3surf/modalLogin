//  Build our app module, with a dependency on the angular modal service.
var app = angular.module('modallogin', [
    'ngRoute',
    /*'ui.router',*/
    'angularModalService',
    'authentication',
    'users',
    'slugifier',
    'ngSanitize'
])
.config(function($routeProvider, googleLoginProvider) {
    googleLoginProvider.configure({
        clientId: '943071059112-ml56hbmgg8uhjam96bjhq66kotbj491a.apps.googleusercontent.com',
        scopes: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/plus.login"]
    });

    $routeProvider
        .when('/', {
            templateUrl: 'html/main.html',
            controller: 'SampleController'
        })
        .when('/home', {
            templateUrl: 'html/home.html',
            controller: 'homeController'
        })
        .when('/finder', {
            templateUrl: 'html/finder/users.html',
            controller: 'finderController'
        })
        .when('/finder/user/:id', {
            templateUrl: 'html/finder/user.html',
            controller: 'finderUserController'
        })
        .when('/twitter', {
            templateUrl: 'html/tweets.html',
            controller : 'tweetsController'
        })
        .when('/blog', {
            templateUrl: 'html/blog/blog.html',
            controller : 'blogController'
        })
        .when('/blog/:slug', {
            templateUrl: 'html/blog/blog_content.html',
            controller : 'blogContentController'
        })
        .when('/intranet', {
            templateUrl: 'html/intranet/intranet.html',
            controller : 'intranetController'
        })
        .when('/intranet/:slug', {
            templateUrl: 'html/intranet/intranet_content.html',
            controller: 'intranetContentController'
        })
        .otherwise({
            redirectTo: '/'
        });
    }
);

app.run(["$rootScope", "googleLogin", "$window", function($rootScope, googleLogin, $window) {
    googleLogin.login();
    $rootScope.$on("google:authenticated", function(auth) {
        console.log(auth);
        $window.location.href = '#/home';
        /*$location.url('#/home');*/
    });

}]);