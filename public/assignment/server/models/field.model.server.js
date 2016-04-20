var q = require ("q");
module.exports = function (mongoose, formModel) {

    var fieldSchema = require("./field.schema.server.js")(mongoose);
    var fieldModel = mongoose.model("fieldModel", fieldSchema);



    var api = {
        createField : createField,
        findAllFields : findAllFields,
        findFieldId : findFieldById,
        updateField : updateField,
        deleteField : deleteField,
        createNewFieldForFormId : createNewFieldForFormId,
        deleteFieldByFieldAndFormId : deleteFieldByFieldAndFormId,
        findAllFieldsForFormId : findAllFieldsForFormId,
        findFieldByFieldAndFormId : findFieldByFieldAndFormId,
        updateFieldByFieldAndFormId : updateFieldByFieldAndFormId,
        updateAllFieldsOfFormId: updateAllFieldsOfFormId
    }

    return api;

    function createField (field) {
        var deferred = q.defer ();
        var newField={
            label:field.label,
            type:field.type,
            placeholder:field.placeholder,
            options:field.options
        };
        fieldModel.create (newField, function (err, field) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (field);
        });
        return deferred.promise;
    }

    function findAllFields() {
        var deferred = q.defer ();

        fieldModel.find (function (err, fields) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (fields);
        });
        return deferred.promise;
    }

    function findFieldById (fieldId) {
        var deferred = q.defer ();

        formModel.findById (fieldId, function (err, field) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(field);
        });
        return deferred.promise;
    }

    function updateField (id, updatedField) {
        var deferred = q.defer ();
        delete updatedField["_id"];
        fieldModel.update ({"_id" : id}, {$set: updatedField}, function (err, field) {
            if (err)
                deferred.reject (err);
            else
                deferred.resolve (field);
        });
        return deferred.promise;
    }

    function deleteField(id) {
        var deferred = q.defer ();
        fieldModel.remove ({"_id" : id}, function (err, success) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(success);
        });
        return deferred.promise;
    }

    function deleteFieldByFieldAndFormId (formId, fieldId) {
        var deferred = q.defer ();

        formModel.findById (formId, function (err, form) {
            if (err)
                deferred.reject (err);
            else {
                var fieldIndex = getIndexOfFieldInFieldList(fieldId, form.fields);
                form.fields.splice (fieldIndex, 1);
                form.save (function (err, form) {
                    deferred.resolve(form.fields);
                });
            }
        });
        return deferred.promise;
    }

    function getIndexOfFieldInFieldList(fieldId, fields)
    {
        for(var a = 0;  a< fields.length; a++)
        {
            if(fields[a].id == fieldId){
                return a;
            }
        }
        return -1;
    }

    function findAllFieldsForFormId (formId) {
        var deferred = q.defer ();

        formModel.findById (formId, {"fields" : 1, "_id" : 0}, function (err, fields) {
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


    function findAllFieldsForFormId (formId) {
        var deferred = q.defer ();

        formModel.findById (formId, {"fields" : 1}, function (err, form) {
            if (err)
                deferred.reject (err);
            else
                deferred.resolve (form.fields);
        });
        return deferred.promise;
    }

    function  updateAllFieldsOfFormId(formId, fields){
        var deferred = q.defer ();

        formModel.findById (formId, function (err, form) {
            if (err) {
                deferred.reject (err);
            } else {
                form.fields = fields;
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

    function createNewFieldForFormId (formId, newField) {
        var deferred = q.defer ();

        formModel.findById (formId, function (err, form) {
            if (err)
                deferred.reject (err);
            else {
                 createField(newField)
                    .then(function (createdField) {
                        console.log(createdField);
                        form.fields.push (createdField);
                        form.save (function (err)
                        {
                            if(err){
                                deferred.reject(err);
                            }
                            else
                            {
                                deferred.resolve(form.fields);
                            }

                        });
                    });
            }
        });
        return deferred.promise;
    }

}