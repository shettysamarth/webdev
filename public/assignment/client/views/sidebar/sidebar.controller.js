"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function  SidebarController($scope, $location, $rootScope) {
        $scope.$location = $location;

        if(typeof $rootScope.user != 'undefined'){
            $scope.currentUser = $rootScope.user;
        }

        $scope.$watch(function() {
            return $rootScope.user;
        }, function() {

            if(typeof $rootScope.user == 'undefined'){
                $scope.currentUser = null;
            }
            else if($rootScope.user == null){
                $scope.currentUser = null;
            }
            else
            {
                $scope.currentUser = $rootScope.user;
            }
        }, true);
    }
})();

