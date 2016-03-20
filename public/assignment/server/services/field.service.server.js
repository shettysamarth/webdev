"use strict";
module.exports = function(app, model) {
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldAndFormId);
    app.get("/api/assignment/form/:formId/field", findAllFieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldAndFormId);
    app.post("/api/assignment/form/:formId/field", createNewFieldForFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldAndFormId);
    app.put("/api/assignment/fieldform/:formId", updateAllFieldsOfFormId);


    function findAllFieldsForFormId (req, res) {
        var formId = req.params.formId;
        res.json(model.findAllFieldsForFormId(formId));
    }

    function findFieldByFieldAndFormId (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.findFieldByFieldAndFormId(formId, fieldId));
    }

    function deleteFieldByFieldAndFormId (req, res) {
        console.log("delete from server field service");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.deleteFieldByFieldAndFormId(formId, fieldId));
    }

    function createNewFieldForFormId (req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        res.json(model.createNewFieldForFormId(formId, newField));
    }

    function updateFieldByFieldAndFormId (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;
        res.json(model.updateFieldByFieldAndFormId(formId, fieldId, updatedField));
    }

    function updateAllFieldsOfFormId(req, res) {
        console.log("received updateAllFieldsOfFormId")
        var formId = req.params.formId;
        var fields = req.body;
        res.json(model.updateAllFieldsOfFormId(formId,fields));
    }
};