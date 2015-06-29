/**
 * Created by danielalorenzo on 18/6/15.
 */
var app = angular.module('modallogin');

app.controller('SampleController', ['$scope', 'ModalService', '$window', function($scope, ModalService, $window) {

    $scope.complexResult = null;
    console.log('Estoy en sample controller');

    $scope.showLogin = function() {

        ModalService.showModal({
            templateUrl: "html/login.html",
            controller: "loginController",
            inputs: {
                title: "Log in to BEEFound"
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if(result.loggedin != null){
                    /*$location.path('/home');*/
                    $window.location.href = '#/home';
                }
                else{
                    /*$location.path('/login');*/
                    $window.location.href = '#/login';
                }
                $scope.complexResult  = "Username: " + result.name + ", loggedin: " + result.loggedin;
            });
        });
    };

}]);