"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function  LoginController($scope, $rootScope, UserService, $location)
    {
        console.log("LoginController in place");
        $scope.login = login;

        function login(user)
        {
            UserService.login(user).then(loginCallback);
        }

        function  loginCallback(response)
        {
            if(response.data){
                UserService.setCurrentUser(response.data);
                $location.path("/profile");
            }
            else {
                $scope.errorMessage="Invalid Username/Password!!";
                $timeout(function(){
                    $scope.errorMessage=false;
                },2000);
            }
        }
    }

})();