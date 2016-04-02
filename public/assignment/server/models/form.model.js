"use strict";
var uuid = require('node-uuid');
var q = require ("q");
module.exports = function (app) {
    var api = {
        createForm : createForm,
        findAllForms : findAllForms,
        findFormById : findFormById,
        updateForm : updateForm,
        deleteForm : deleteForm,
        findFormByTitle : findFormByTitle,
        findAllFormsForUserId : findAllFormsForUserId,
        createFormForUserId : createFormForUserId,
        findAllFieldsForFormId : findAllFieldsForFormId,
        findFieldByFieldAndFormId : findFieldByFieldAndFormId,
        deleteFieldByFieldAndFormId : deleteFieldByFieldAndFormId,
        createNewFieldForFormId : createNewFieldForFormId,
        updateFieldByFieldAndFormId : updateFieldByFieldAndFormId,
        updateAllFieldsOfFormId: updateAllFieldsOfFormId
    };
    return api;

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

    function  updateAllFieldsOfFormId(formId, fields){
        var deferred = q.defer ();

        FormModel.findById (formId, function (err, form) {
            if (err) {
                deferred.reject (err);
            } else {
                form.fields[fieldIndex].label = field.label;
                form.fields[fieldIndex].fieldType = field.fieldType;
                form.fields[fieldIndex].options = field.options;
                form.fields[fieldIndex].placeholder = field.placeholder;
                form.save(function (err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form);
                    }
                });
            }
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
        var formsForUser = [];
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].userId == userId) {
                formsForUser.push(forms[i]);
            }
        }
        console.log(formsForUser);
        return formsForUser;
    }

    function createFormForUserId (userId, newForm) {
        console.log(newForm);
        console.log(userId);
        var form = {
            title : newForm.title,
            userId : userId,
            fields : newForm.fields
        }
        forms.push(form);
        return findAllFormsForUserId(userId);
    }

    function  deleteFormForUserId(userId, formId)
    {
        deleteForm(formId);
        return findAllFormsForUserId(userId);
    }

    function findAllFieldsForFormId (formId) {
        var deferred = q.defer ();

        FormModel.findById (formId, {"fields" : 1, "_id" : 0}, function (err, fields) {
            if (err)
                deferred.reject (err);
            else
                deferred.resolve (fields);
        });
        return deferred.promise;
    }

    function findFieldByFieldAndFormId (formId, fieldId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                var fields = forms[i].fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j].id == fieldId)
                        return fields[j];
                }
            }
        }
        return null;
    }

    function deleteFieldByFieldAndFormId (formId, fieldId) {
        var deferred = q.defer ();

        FormModel.findById (formId, function (err, form) {
            if (err)
                deferred.reject (err);
            else {
                var fieldIndex = getIndexOfFieldInFieldList(fieldId, form.fields);
                form.fields.splice (fieldIndex, 1);
                form.save (function (err, form) {
                    deferred.resolve(form);
                });
            }
        });
        return deferred.promise;
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

    function createNewFieldForFormId (formId, newField) {
        var deferred = q.defer ();

        FormModel.findById (formId, function (err, form) {
            if (err)
                deferred.reject (err);
            else {
                form.fields.push (newField);
                form.save (function (err, form) {
                    deferred.resolve(form);
                });
            }
        });
        return deferred.promise;
    }

    function updateFieldByFieldAndFormId (formId, fieldId, updatedField) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                var fields = forms[i].fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j].id == fieldId) {
                        forms[i].fields[j].id = updatedField.id;
                        forms[i].fields[j].label = updatedField.label;
                        forms[i].fields[j].type = updatedField.type;
                        forms[i].fields[j].placeholder = updatedField.placeholder;
                        break;
                    }
                }
            }
        }
        return forms[i];
    }
};