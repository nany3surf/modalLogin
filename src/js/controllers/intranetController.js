var app = angular.module('modallogin');
app.controller('intranetController' , function($scope , $http , $location , Slug) {
        $http.get('data_intra.json')
            .success(function(data) {
                $scope.blogIntranet = data;
                console.log(data);

            });

        $scope.go = function(slug) {
            $location.path('/intranet/' + Slug.slugify(slug));
        };

        $scope.slugify = function(input) {
            $scope.mySlug = Slug.slugify(input);
        };

    })
    .controller('intranetContentController', function($scope, $routeParams , $http , Slug) {
        $scope.intranetSlug = $routeParams.slug;
        $scope.blogIntranet = [];

        $http.get('data_intra.json')
            .success(function(data) {
                angular.forEach(data , function(value , key) {
                    if (Slug.slugify(value['slug']) == $scope.intranetSlug) {
                        $scope.blogIntranet = value
                    }
                });
            });
    });