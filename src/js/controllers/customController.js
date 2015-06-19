/**
 * Created by danielalorenzo on 18/6/15.
 */
var app = angular.module('modallogin');

app.controller('CustomController', ['$scope', 'close', function($scope, close) {

    $scope.display = true;

    $scope.close = function() {
        $scope.display = false;
 	    close();
    };

}]);