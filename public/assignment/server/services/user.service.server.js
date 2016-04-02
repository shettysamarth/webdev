"use strict";
module.exports = function (app, model) {
    app.get("/api/assignment/user/username=:username&password=:password", findUserByUsernameAndPassword);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:userId", findUserById);
    app.put("/api/assignment/user/:userId", updateUser);
    app.delete("/api/assignment/user/:userId", deleteUser);
    app.get("/api/assignment/user/username=:username", findUserByUsername);

    function createUser (req, res) {
        var newuser = req.body;
        model.addNewUser(newuser)
            .then(function (user) {
                res.json(user);
            });
    }

    function findAllUsers (req, res) {
        model.findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }

    function findUserById (req, res) {
        var id = req.params.userId;
        model.findUserById(id)
            .then(function (user) {
                res.json(user);
            });
    }

    function findUserByUsername (req, res) {
        var username = req.params.username;
        model.findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            });
    }

    function findUserByUsernameAndPassword (req, res) {
        var credentials = {
            "username" : req.params.username,
            "password" : req.params.password
        };
        model.findUserByCredentials(credentials)
            .then (function (user) {
                res.json(user);
            });
    }

    function updateUser (req, res) {
        var id = req.params.userId;
        var updatedUser = req.body;
        model.updateUser(id, updatedUser)
            .then(function(user){
                res.json(user);
            });
    }

    function deleteUser (req, res) {
        var id = req.params.userId;

        model.deleteUser(id)
            .then (function(success)
            {
                res.json(success);
            });
    }
};