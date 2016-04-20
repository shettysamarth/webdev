"use strict";
var uuid = require('node-uuid');
var q = require ("q");
module.exports = function (mongoose) {

    var fieldSchema = require("./field.schema.server")(mongoose);
    var formSchema = require("./form.schema.server.js")(mongoose, fieldSchema);
    var FormModel = mongoose.model("FormModel", formSchema);


    var api = {
        createForm : createForm,
        findAllForms : findAllForms,
        findFormById : findFormById,
        updateForm : updateForm,
        deleteForm : deleteForm,
        findFormByTitle : findFormByTitle,
        findAllFormsForUserId : findAllFormsForUserId,
        createFormForUserId : createFormForUserId,
        getFormModel : getFormModel
    };
    return api;

    function getFormModel()
    {
        return FormModel;
    }

    function createForm (newform) {
        function createForm (newform) {
            var deferred = q.defer ();
            FormModel.create (newform, function (err, form) {
                if (err)
                    deferred.reject(err);
                else
                    deferred.resolve (form);
            });
            return deferred.promise;
        }
    }

    function findAllForms() {
        var deferred = q.defer ();

        FormModel.find (function (err, forms) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (forms);
        });
        return deferred.promise;
    }

    function findFormById (formId) {
        var deferred = q.defer ();

        FormModel.findById (formId, function (err, form) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(form);
        });
        return deferred.promise;
    }

    function updateForm (id, updatedForm) {

        var deferred = q.defer ();
        delete updatedForm["_id"];
        FormModel.update ({"_id" : id}, {$set: updatedForm}, function (err, form) {
            if (err)
                deferred.reject (err);
            else
                deferred.resolve (form);
        });
        return deferred.promise;
    }



    function deleteForm (id) {
        console.log ("Model " + id);
        var deferred = q.defer ();

        FormModel.remove ({"_id" : id}, function (err, success) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(success);
        });
        return deferred.promise;
    }

    function findFormByTitle (title) {
        var toReturn = null;
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].title == title) {
                toReturn = forms[i];
                break;
            }
        }
        return toReturn;
    }

    function findAllFormsForUserId (userId) {
        var deferred = q.defer ();
        console.log("user id "+ userId);
        FormModel.find ({userId : userId}, function (err, forms) {
            if (err)
                deferred.reject(err);
            else {
                console.log(forms);
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function createFormForUserId (userId, newForm) {
        console.log(newForm);
        console.log(userId);
        var form = {
            title : newForm.title,
            userId : userId,
            fields : newForm.fields
        }
        console.log(form);
        var deferred = q.defer ();
        FormModel.create (form, function (err, resform) {
            if (err)
                deferred.reject(err);
            else {
                console.log(resform);
                findAllFormsForUserId(userId)
                    .then(function (forms) {
                    deferred.resolve(forms);
                });
            }

        });
        return deferred.promise;
    }

    function  deleteFormForUserId(userId, formId)
    {
        deleteForm(formId);
        return findAllFormsForUserId(userId);
    }

    function getIndexOfFieldInFieldList(fieldId, fields)
    {
        for(var a = 0;  a< fields.length(); a++)
        {
            if(fields[a].id == fieldId){
                return a;
            }
        }
        return -1;
    }




};