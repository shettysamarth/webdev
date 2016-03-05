"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function  LoginController($scope, $rootScope, UserService)
    {
        console.log("LoginController in place");
        $scope.login = login;

        function login(user)
        {
            UserService.findUserByCredentials(user.username, user.password, loginCallback)
        }

        function  loginCallback(user)
        {
            if(user)
            {
                $rootScope.user = user;
                $scope.$location.path("/profile");
                console.log(user);
            }
        }
    }

})();