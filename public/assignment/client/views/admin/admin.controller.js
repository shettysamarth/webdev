"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function  AdminController($scope, AdminService) {

        $scope.editingUser = {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            roles: ""
        }

        function getUsers(){
            AdminService.findAllUsers()
                .then(getUsersSuccessCallback, getUsersFailureCallback);
        }

        function validateFields(){

            if($scope.editingUser.username == ""||$scope.editingUser.username == ""||$scope.editingUser.username == ""||
                $scope.editingUser.username == ""||$scope.editingUser.username == ""||$scope.editingUser.username == ""){
                alert("All fields are mandatory!");
                return false;
            }
            return true;
        }

        getUsers();

        function getUsersSuccessCallback(response){
            $scope.users = response.data;
        }

        function getUsersFailureCallback(err){
            console.log(err);
        }


        function addUser(){
            if(validateFields()){

            }
        }

        $scope.predicate = 'username';
        $scope.reverse = true;
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };

        $scope.decideIcon = function () {
            if($scope.reverse){
               return "glyphicon glyphicon-triangle-bottom";
            }
            else{
                return "glyphicon glyphicon-triangle-top"
            }
        }

        function loadEditFieldWithSelectedUser(user){
            $scope.editingUser.username= user.username;
            $scope.editingUser.password= user.password;
            $scope.editingUser.firstName= user.firstName;
            $scope.editingUser.lastName= user.lastName;
            $scope.editingUser.roles= user.roles.join(',');
        }

        $scope.editUser = function(user){
            $scope.editingId = user._id;
            loadEditFieldWithSelectedUser(user);
        }

        function getIndexOfUserGivenId(userId){
            for(var i=0; i<$scope.users.length; i++){
                if(userId === $scope.users[i]._id){
                    return i;
                }
            }
            return -1;
        }

        $scope.updateUser= function(){
            if(validateFields() && $scope.editingId){
                AdminService.updateUser($scope.editingId, createServerModel())
                    .then(function (user) {
                        if(getIndexOfUserGivenId(user.data._id) >=0 ){
                            $scope.users[getIndexOfUserGivenId(user.data._id)] = user.data;
                            $scope.users;
                        }
                    });
            }
        }

        $scope.deleteUser = function(user){
            AdminService.deleteUserById(user._id)
                .then(function(response){
                    $scope.users.splice(getIndexOfUserGivenId(user._id),1);
                })
        }

        function createServerModel(){

            var user = {
                username: $scope.editingUser.username,
                password: $scope.editingUser.password,
                firstName: $scope.editingUser.firstName,
                lastName: $scope.editingUser.lastName,
                roles: $scope.editingUser.roles.split(",")
            }
            return user;
        }

        $scope.addUser = function(){

            if(validateFields()){
                AdminService.createNewUser(createServerModel())
                    .then(function(user){
                        console.log(user);
                        $scope.users.push(user.data);
                    });
            }
        }


    }
})();

