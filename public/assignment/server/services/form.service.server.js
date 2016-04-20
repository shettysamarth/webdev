"use strict";
module.exports = function(app, model) {
    app.post("/api/assignment/form", createForm);
    app.get("/api/assignment/form", findAllForms);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUserId);
    app.post("/api/assignment/user/:userId/form", createFormForUserId);

    function createForm (req, res) {
        var newform = req.body;
        model.createForm(newform)
            .then (function (result){
            res.json(result);
        });
    }

    function findAllForms (req, res) {
        model.findAllForms()
            .then (function (result){
                res.json(result);
            });
    }

    function findFormById (req, res) {
        var formId = req.params.formId;
        model.findFormById(formId)
            .then (function (result){
                res.json(result);
            });
    }

    function updateForm (req, res) {
        var formId = req.params.formId;
        var updatedForm = req.body;
        model.updateForm(formId, updatedForm)
            .then (function (result){
                res.json(result);
            });
    }

    function deleteFormById (req, res) {
        var formId = req.params.formId;
        model.deleteForm(formId)
            .then (function (result){
                res.json(result);
            });
    }

    function findAllFormsForUserId (req, res) {
        var userId = req.params.userId;
        model.findAllFormsForUserId(userId)
            .then (function (result){
                res.json(result);
            });
    }

    function createFormForUserId (req, res) {

        var userId = req.params.userId;
        var newform = req.body;
        model.createFormForUserId(userId, newform)
            .then (function (result){
                res.json(result);
            });
    }
};