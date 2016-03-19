"use strict";
var forms = require("./form.mock.json");
var uuid = require('node-uuid');

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
    };
    return api;



    function createForm (newform) {
        console.log(newform);
        var form = {
            id :  uuid.v1(),
            title : newform.title,
            userId : newform.userId,
            fields : newform.fields
        };
        forms.push(form);
        return forms;
    }

    function findAllForms() {
        return forms;
    }

    function findFormById (id) {
        var toReturn = null;
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == id) {
                toReturn = forms[i];
                break;
            }
        }
        return toReturn;
    }

    function updateForm (id, updatedForm) {

        console.log(id + updatedForm);

        for (var i = forms.length - 1; i >= 0; i--) {
            if (forms[i].id === id) {
                for(var attr in updatedForm) {
                    //if(userObj.hasOwnProperty(attr))
                    forms[i][attr] = updatedForm[attr];
                }
                break;
            }
        }
    return forms;
    }

    function deleteForm (id) {
        for (var index = 0; index < forms.length; index++) {
            if (forms[index].id == id) {
                forms.splice(index, 1);
                break;
            }
        }
        console.log(forms);
        return forms;
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
            id : uuid.v1(),
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
        var fieldsToReturn = [];
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                fieldsToReturn.push(forms[i].fields);
                break;
            }
        }
        return fieldsToReturn;
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
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                var fields = forms[i].fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j].id == fieldId) {
                        forms[i].fields[j].splice(j, 1);
                        break;
                    }
                }
            }
        }
        return null;
    }

    function createNewFieldForFormId (formId, newField) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                forms[i].fields.push(newField);
                break;
            }
        }
        return forms[i];
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