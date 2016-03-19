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
        res.json(model.createForm(newform));
    }

    function findAllForms (req, res) {
        res.json(model.findAllForms());
    }

    function findFormById (req, res) {
        var formId = req.params.formId;
        res.json(model.findFormById(formId));
    }

    function updateForm (req, res) {
        var formId = req.params.formId;
        var updatedForm = req.body;
        res.json(model.updateForm(formId, updatedForm));
    }

    function deleteFormById (req, res) {
        var formId = req.params.formId;
        res.json(model.deleteForm(formId));
    }

    function findAllFormsForUserId (req, res) {
        var userId = req.params.userId;
        res.json(model.findAllFormsForUserId(userId));
    }

    function createFormForUserId (req, res) {

        var userId = req.params.userId;
        var newform = req.body;
        res.json(model.createFormForUserId(userId, newform));
    }
};