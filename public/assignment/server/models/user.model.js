"use strict";
var q = require ("q");
module.exports = function(mongoose) {

    var userSchema = require("./user.schema.server.js")(mongoose);
    var userModel = mongoose.model("userModel", userSchema);

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
        return userModel.findById(userId);
    }

    function findUserByCredentials(credentials) {
        return userModel.findOne({username: credentials.username,
            password: credentials.password});
    }

    function findUserByUsername(username) {
        return userModel.findOne({username: username});
    }

    function findAllUsers() {
        return userModel.find();
    }

    function deleteUser(userId) {
        return userModel.remove({_id: userId});
    }

    function addNewUser(newUser) {
        return userModel.create(newUser);
    }

    function updateUser(userId, userObj) {
        return userModel.update({_id: userId}, {$set: userObj});

    }
};