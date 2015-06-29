var app = angular.module('modallogin');
app.controller('blogController' , function($scope , $http , $location , Slug) {
        $http.get('data.json')
            .success(function(data) {
                $scope.blogs = data

            });

        $scope.go = function(slug) {
            $location.path('/blog/' + Slug.slugify(slug));
        };

        $scope.slugify = function(input) {
            $scope.mySlug = Slug.slugify(input);
        };

    })
    .controller('blogContentController', function($scope, $routeParams , $http , Slug) {
        $scope.blogSlug = $routeParams.slug;
        $scope.blog = [];

        $http.get('data.json')
            .success(function(data) {
                angular.forEach(data , function(value , key) {
                    if (Slug.slugify(value['slug']) == $scope.blogSlug) {
                        $scope.blog = value
                    }
                });
            });
    });