"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function  ProfileController($scope, $rootScope, UserService)
    {
        console.log("ProfileController in place");
        console.log($rootScope.user);
        $scope.update = update;
        function makeUserModel() {
            var user = {
                username: $rootScope.user.username,
                password: $rootScope.user.password,
                firstName: $rootScope.user.firstName,
                lastName: $rootScope.user.lastName,
                emails: $rootScope.user.emails.join(),
                phones: $rootScope.user.phones.join()
            }
            console.log("makeUserModel" + user);
            $scope.profileUser = user;
        }

        makeUserModel();


        function makeServerModel(){
            var user = {
                username: $scope.profileUser.username,
                password: $scope.profileUser.password,
                firstName: $scope.profileUser.firstName,
                lastName: $scope.profileUser.lastName,
                emails: $scope.profileUser.emails.split(","),
                phones: $scope.profileUser.phones.split(",")
            }
            console.log("makeServerModel" + user);
            return user;
        }

        function update(user)
        {
            console.log("update");
            UserService.updateUser($rootScope.user["_id"], makeServerModel()).then(updateCallback);
        }

        function updateCallback(user)
        {
            console.log(user);
            if(user)
            {
                $rootScope.user = user.data;
                makeUserModel();
            }
        }
    }
})();