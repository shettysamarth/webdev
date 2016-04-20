"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function  HomeController($scope, $location,UserService) {

        $scope.$location = $location;
        UserService.getCurrentUser()
            .then(function(response) {
                UserService.setCurrentUser(response.data);
            });
    }
})();

