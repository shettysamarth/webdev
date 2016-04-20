"use strict";

(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope, $http, $q)
    {
        var UserService = {

            login:login,
            logout:logout,
            register:register,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            findAllUsers : findAllUsers,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        }

        return UserService;

        function login(user) {
            return $http.post("/api/assignment/user/login", user);
        }

        function logout() {
            return $http.post("/api/assignment/user/logout");
        }

        function register(user) {
            return $http.post("/api/assignment/user/register", user);
        }


        function getCurrentUser() {
            return $http.get("/api/assignment/user/logged_in");
        }

        function setCurrentUser(user) {
            if(user) {
                $rootScope.user = user;
            }
        }

        function findAllUsers(){

            return $http.get("/api/assignment/user");
        }

        function  deleteUserById(userId){
            return $http.delete("/api/assignment/user/"+userId);
        }

        function updateUser(userId, user)
        {
            return $http.put("/api/assignment/user/"+userId, user);
        }
    }
})();