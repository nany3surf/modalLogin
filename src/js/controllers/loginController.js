/**
 * Created by danielalorenzo on 18/6/15.
 */
var app = angular.module('modallogin');
app.config(function(googleLoginProvider) {
    googleLoginProvider.configure({
        clientId: '943071059112-ml56hbmgg8uhjam96bjhq66kotbj491a.apps.googleusercontent.com',
        scopes: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/plus.login"]
    });
});
app.controller('loginController', ['$scope', '$element', 'title', 'close', 'googleLogin', 'googlePlus',
    function($scope, $element, title, close, googleLogin, googlePlus) {

        $scope.loggedin = 'Not logged in';
        $scope.currentUser = 'No user';
        /*$scope.age = null;*/
        $scope.title = title;
        console.log('estoy con pruebas');

        //  This close function doesn't need to use jQuery or bootstrap, because
        //  the button has the 'data-dismiss' attribute.
        $scope.close = function() {
            console.log("Voy a por el login");
            googleLogin.login();
            console.log("Entro en close");

            close({
                name: $scope.currentUser.name,
                loggedin: $scope.loggedin
            }, 500); // close, but give 500ms for bootstrap to animate
        };

        $scope.$on("googlePlus:loaded", function() {
            googlePlus.getCurrentUser().then(function(user) {
                console.log('Este es mi user: '+user);
                $scope.currentUser = user;
                $scope.loggedin = 'You are loggedin';
            });
        });

        /*$scope.$on("googlePlus:loaded", function() {
            console.log("Entro en googlePlus");
            googlePlus.getCurrentUser().then(function(userInfo) {
                $scope.currentUser = userInfo;
                $scope.loggedin = 'You are loggedin';
            });

            close({
                name: $scope.currentUser.name,
                loggedin: $scope.loggedin
            }, 500); // close, but give 500ms for bootstrap to animate
        });*/

        //  This cancel function must use the bootstrap, 'modal' function because
        //  the doesn't have the 'data-dismiss' attribute.
        $scope.cancel = function() {
            //  Manually hide the modal.
            $element.modal('hide');

            //  Now call close, returning control to the caller.
            close({
                name: $scope.currentUser.name,
                loggedin: $scope.loggedin
            }, 500); // close, but give 500ms for bootstrap to animate
        };
    }]
);