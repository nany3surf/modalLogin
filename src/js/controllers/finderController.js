/**
 * Created by danielalorenzo on 25/6/15.
 */
var app = angular.module('modallogin');
app.controller('finderController', function ($scope, userService) {
        $scope.users = userService.getUsers();
        $scope.proyectos = userService.getProyects();
        $scope.roles = userService.getRoles();
    })
    .controller('finderUserController', function($scope, $routeParams, userService) {
        $scope.id = $routeParams.id;
        $scope.proyectos = [];
        $scope.user = userService.getUser($scope.id);

    });