//  Build our app module, with a dependency on the angular modal service.
var app = angular.module('modallogin', [
    'angularModalService',
    'authentication'
]);
/*
.config(function($routeProvider) {
    $routeProvider.
        */
/*when('/login', {controller: "LoginController", templateUrl: 'login.html'}).*//*

        when('/', {templateUrl:'index.html', controller: "SampleController", reloadOnSearch: false}).
        when("/login", {templateUrl: "login.html", controller: "loginController"}).
        */
/*when("/calendario", {templateUrl: "calendario.html", controller: "CalendarioController"}).*//*

        otherwise({redirectTo: '/'});
});
*/

app.controller('SampleController', ['$scope', 'ModalService', function($scope, ModalService) {
  
    $scope.complexResult = null;

    console.log('Estoy en sample controller');

    $scope.showLogin = function() {

        ModalService.showModal({
            templateUrl: "login.html",
            controller: "loginController",
            inputs: {
                title: "Log in to BEEFound"
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.complexResult  = "Username: " + result.name + ", loggedin: " + result.loggedin;
            });
        });
    };

}]);