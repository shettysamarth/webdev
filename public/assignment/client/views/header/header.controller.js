"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function  HeaderController($scope, $location, $rootScope, UserService)
    {
        $scope.$location = $location;
        $scope.logout = logout;
        //$scope.user = $rootScope.user;

        function logout()
        {
            $rootScope.user = null;
            //$scope.user = null;
            UserService.logout().
            then(function(){
                $location.path("/home");
                $rootScope.user = null;
        });

        }
    }


})();