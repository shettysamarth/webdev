"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function  ProfileController($scope, $rootScope, UserService)
    {
        console.log("ProfileController in place");
        console.log($rootScope.user);
        $scope.update=update;
        $scope.user.username= $rootScope.user.username;
        $scope.user.password= $rootScope.user.password;
        $scope.user.firstName= $rootScope.user.firstName;
        $scope.user.lastName= $rootScope.user.lastName;
        $scope.user.email = $rootScope.user.emails[0];

        function update(user)
        {
            console.log("update");
            user.emails = [user.email];
            UserService.updateUser($rootScope.user["_id"], user).then(updateCallback);
        }

        function updateCallback(user)
        {
            console.log(user);
            if(user)
            {
                $rootScope.user = user;
            }
        }
    }
})();