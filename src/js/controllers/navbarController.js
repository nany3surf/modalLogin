/**
 * Created by danielalorenzo on 25/6/15.
 */
var app = angular.module('modallogin');

app.controller('navbarController' , function($scope ,$rootScope, $location) {

        $scope.isActive = function (viewLocation) {
            var active = false;

            if ($location.path().indexOf(viewLocation) != -1){
                active = true;
            }
            return active;
        };

        $scope.clickAction = function()
        {
            $rootScope.trigger = 1;
        };

    }
);