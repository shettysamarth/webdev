"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function  SidebarController($scope, $location, $rootScope) {
        $scope.$location = $location;
        console.log($location);
    }
})();

