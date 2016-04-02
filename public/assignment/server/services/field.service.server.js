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
        model.findAllFieldsForFormId(formId)
            .then(function(fields){
                res.json(fields);
            });
    }

    function findFieldByFieldAndFormId (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.findFieldByFieldAndFormId(formId, fieldId).then(function(field){
            res.json(field);
        });
    }

    function deleteFieldByFieldAndFormId (req, res) {
        console.log("delete from server field service");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.deleteFieldByFieldAndFormId(formId, fieldId)
            .then(function(res){
                res.json(res);
        });
    }

    function createNewFieldForFormId (req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        model.createNewFieldForFormId(formId, newField)
            .then(function(res){
                res.json(res);
        });
    }

    function updateFieldByFieldAndFormId (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;
        model.updateFieldByFieldAndFormId(formId, fieldId, updatedField)
            .then(function(res){
                res.json(res);
        });
    }

    function updateAllFieldsOfFormId(req, res) {
        console.log("received updateAllFieldsOfFormId")
        var formId = req.params.formId;
        var fields = req.body;
        model.updateAllFieldsOfFormId(formId,fields)
            .then(function(res){
                res.json(res);
            });
    }
};