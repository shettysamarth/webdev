//deleteFieldByFieldAndFormId);
//app.get("/api/assignment/form/:formId/field", findAllFieldsForFormId);
//app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldAndFormId);
//app.post("/api/assignment/form/:formId/field", createNewFieldForFormId);
//app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldAndFormId);
//app.put("/api/assignment/form/:formId", updateAllFieldsOfFormId);

"use strict";
(function ()
{
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {
        var api = {
            deleteFieldByFieldAndFormId: deleteFieldByFieldAndFormId,
            findAllFieldsForFormId: findAllFieldsForFormId,
            findFieldByFieldAndFormId: findFieldByFieldAndFormId,
            createNewFieldForFormId: createNewFieldForFormId,
            updateFieldByFieldAndFormId: updateFieldByFieldAndFormId,
            updateAllFieldsOfFormId: updateAllFieldsOfFormId
        }

        return api;

        function createNewFieldForFormId(formId, field)
        {
            var deferred = $q.defer();
            $http
                .post("/api/assignment/form/" + formId + "/field", field)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateFieldByFieldAndFormId(formId, fieldId, field)
        {
            var deferred = $q.defer();
            $http
                .put("/api/assignment/form/" + formId + "/field/" + fieldId, field)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateAllFieldsOfFormId(formId, fields)
        {
            var deferred = $q.defer();
            $http
                .put("/api/assignment/fieldform/" + formId, fields)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFieldByFieldAndFormId(formId, fieldId)
        {
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function (response) {
                    deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findAllFieldsForFormId(formId)
        {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + formId + "/field")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findFieldByFieldAndFormId()
        {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();