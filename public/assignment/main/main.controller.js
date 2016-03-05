"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function  MainController($scope,$location) {
        $scope.$location=$location;
        $scope.$location.path("/home");
    }
})();