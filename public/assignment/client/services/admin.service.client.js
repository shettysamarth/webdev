"use strict";

(function()
{
    angular
        .module("FormBuilderApp")
        .factory("AdminService",AdminService);

    function AdminService($rootScope, $http, $q)
    {
        var AdminService = {

            createNewUser : createNewUser,
            findUserByid : findUserByid,
            findAllUsers : findAllUsers,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        }

        return AdminService;

        function createNewUser(user){
            return $http.post("/api/assignment/admin/user", user);
        }

        function findUserByid(userId){
            return $http.get("/api/assignment/admin/user/"+userId);
        }

        function findAllUsers(){

            return $http.get("/api/assignment/admin/user");
        }

        function  deleteUserById(userId){
            return $http.delete("/api/assignment/admin/user/"+userId);
        }

        function updateUser(userId, user)
        {
            return $http.put("/api/assignment/admin/user/"+userId, user);
        }
    }
})();