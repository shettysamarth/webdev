"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function  RegisterController($scope, $rootScope, UserService) {
        $scope.register=register;
        console.log("registerController in place");

        function register(user) {
            console.log("registerClicked");
            user.emails = [user.email];
            UserService.createUser(user).then(serviceCallBack);
        }

        function serviceCallBack(user){
            if(user)
            {
                console.log("ser" + user);
                $rootScope.user = user;
                $scope.$location.path("/profile");
                console.log("user Created :");
                console.log(user);
            }
        }
    }




})();