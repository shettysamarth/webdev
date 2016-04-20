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
            console.log(user);
            var newUser = {
                username: user.username,
                password: user.password,
                emails: user.emails.split(","),

            }
            UserService.register(newUser).then(serviceCallBack);
        }

        function serviceCallBack(user){
            if(user)
            {
                console.log("serviceCallBack")
                console.log(user);
                $rootScope.user = user.data;
                $scope.$location.path("/profile");
                console.log("user Created :");
                console.log(user);
            }
        }
    }
})();