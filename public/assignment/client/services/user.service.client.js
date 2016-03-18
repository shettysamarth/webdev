"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService()
    {
        var users = [
            {    "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]        },
            {    "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]        },
            {    "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]        },
            {    "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {    "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]        }
        ];

        var UserService = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        }

        return UserService;

        function findUserByCredentials(username, password, callback){
            for(var index=0; index< users.length; index++){
                if((users[index]["username"] === username) && (users[index]["password"]===password )){
                    callback(users[index]);
                }
            }
            callback(null);
        }

        function findAllUsers(callback){
            callback(users);
        }

        function  createUser(user, callback){
            var newUser = {
                username:user.username,
                password:user.password,
                email:user.email,
                firstName:user.firstName,
                lastname:user.lastName,
                _id : (new Date).getTime()

            }
            users.push(newUser);
            console.log("user created");
            callback(user);
        }

        function  deleteUserById(userId, callback){
            for(var index=0; index< users.length; index++){
                if((users[index]["username"] === username) && (users[index]["password"]===password )){
                    users.splice(index, 1);
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback)
        {
            for(var index=0; index< users.length; index++){
                if(users[index]["_id"] === userId)
                {
                    users[index] = user;
                    callback(users[index]);
                    return;
                }
            }
            callback(null);
        }
    }
})();