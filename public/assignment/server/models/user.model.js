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
        var qi = q.defer();
        console.log("findUserByCredentials credentials : ")
        console.log(credentials);
        findUserByUsername(credentials.username)
            .then(function(user){
                console.log(user);
                user.comparePassword(credentials.password, function(err, isMatch){
                       if(err){
                           qi.reject(err);
                       }
                        else if (isMatch){
                           qi.resolve(user);
                       }
                        else{
                           console.log("Match Failed");
                           qi.reject(err);
                       }
                    });
            },
            function(err){
                qi.reject(err);
            });
        return qi.promise;

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
        console.log("User.model.js");
        console.log(userId);
        console.log(userObj);
        var deferred = q.defer();
        findUserById(userId)
            .then(function(user){
                for (var property in userObj) {
                    console.log(property);
                    user[property] = userObj[property];
                }
                console.log(user);
                user.save(function(err, user){
                    if(user){
                        deferred.resolve(user);
                    }
                    else{
                        deferred.reject(err);
                    }

                });
            });
        return deferred.promise;
    }


};