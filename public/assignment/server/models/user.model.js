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
        var deferred = q.defer();
        userModel.findById(userId, function(err, user){
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        userModel.find({username: credentials.username,
            password: credentials.password}, function(err, user){
            console.log("Model output")
            console.log(err);
            console.log(user);
            if(user.length < 1){
                deferred.reject(401);
            }
            else{
                deferred.resolve(user[0]);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {

        var deferred = q.defer();
        userModel.find({username: username}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{

                deferred.resolve(user);
            }
        });
        return deferred.promise;

    }

    function findAllUsers() {
        var deferred = q.defer();
        userModel.find(function(err, users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        userModel.remove({_id: userId}, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function addNewUser(newUser) {
        var deferred = q.defer();
        console.log("zzzz")
        userModel.create(newUser, function(err, doc){
            if(err){
                deferred.reject(err);
            } else{
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, userObj) {
        console.log("inside user.model.js updateUser");
        var deferred = q.defer();
        console.log("update user userId: "+ userId);
        userModel.update({_id: userId}, {$set: userObj}, function(err, user) {
            if(err) {
                console.log("Cud not find Usr!!");
                deferred.reject(err);
            } else {
                console.log("Update successful!");
                userModel.findById(userId, function(err,usr) {
                    console.log(usr);
                    deferred.resolve(usr);
                });
            }
        });
        return deferred.promise;

    }
};