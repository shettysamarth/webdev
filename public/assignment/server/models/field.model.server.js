var q = require ("q");
module.exports = function (mongoose) {

    var fieldModel = require("./field.schema.server.js")(mongoose);

    var api = {
        createField : createField,
        findAllFields : findAllFields,
        findFieldId : findFieldById,
        updateField : updateField,
        deleteField : deleteField
    }

    return api;

    function createField (newfield) {
        var deferred = q.defer ();
        fieldModel.create (newfield, function (err, field) {
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

        FormModel.findById (fieldId, function (err, field) {
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
}