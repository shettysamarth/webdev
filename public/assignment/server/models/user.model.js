"use strict";
var users = require("./user.mock.json");
var uuid = require('node-uuid');
module.exports = function(app) {


    var api = {
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        findAllUsers: findAllUsers,
        deleteUser : deleteUser,
        addNewUser : addNewUser,
        updateUser: updateUser
    };
    return api;

    function findUserById(userId) {
        console.log("inside user.model.js findUserById!!!!!");
        for(var i = 0; i < users.length; i++) {
            if(users[i].id === id) {
                return users[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        var matchedUser = null;

        // iterate over current users and look for a match
        for(var i = 0; i < users.length; i++) {
            if(users[i].username === credentials.username
                && users[i].password === credentials.password) {
                // user found!
                return users[i];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for(var i = 0; i < users.length; i++) {
            if(users[i].username === username) {
                // user found!
                return users[i];
            }
        }
        return null;
    }

    function findAllUsers() {
        return users;
    }

    function deleteUser(userId) {
        for(var i = 0; i < users.length; i++) {
            if(users[i].id === id) {
                // user found!
                users.splice(i, 1);
            }
        }
    }

    function addNewUser(newUser) {
        var user = {
            id : uuid.v1(),
            username : newuser.username,
            password : newuser.password,
            email : newuser.email,
            firstName : newuser.firstName,
            lastName : newuser.lastName
        };
        users.push(user);
        return users;
    }

    function updateUser(userId, userObj) {
        for(var i = 0; i < users.length; i++) {
            if(users[i].id === userId) {
                for(var attr in userObj) {
                    if(userObj.hasOwnProperty(attr))
                        users[i][attr] = userObj[attr];
                }
                break;
            }
        }
    }
};