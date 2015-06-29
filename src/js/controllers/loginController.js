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
app.controller('loginController', ['$scope', '$element', 'title', 'close', 'googleLogin',
    function($scope, $element, title, close, googleLogin) {

        $scope.loggedin = null;
        $scope.currentUser = 'No user';
        $scope.title = title;

        //  This close function doesn't need to use jQuery or bootstrap, because
        //  the button has the 'data-dismiss' attribute.
        $scope.close = function() {
            googleLogin.login();
        };

        $scope.$on("google:authenticated", function(auth) {
            $scope.loggedin = 'Im logged in';
            close({
                name: 'My name',
                loggedin: $scope.loggedin
            }, 500); //
        });

        //  This cancel function must use the bootstrap, 'modal' function because
        //  the doesn't have the 'data-dismiss' attribute.
        $scope.cancel = function() {
            //  Manually hide the modal.
            $element.modal('hide');

            //  Now call close, returning control to the caller.
            close({
                name: $scope.currentUser.displayName,
                loggedin: $scope.loggedin
            }, 500); // close, but give 500ms for bootstrap to animate
        };
    }]
);