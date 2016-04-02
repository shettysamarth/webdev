"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);

    function FormService($http, $q)
    {
        var FormService = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById,
            findFormByFormId : findFormByFormId
        }

        return FormService;

        function createFormForUser(userId, form) {
            var deferred = $q.defer();
            $http
                .post("/api/assignment/user/" + userId + "/form", form)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllFormsForUser(userId) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user/" + userId + "/form")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFormById(formId) {

            var deferred = $q.defer();
            $http
                .delete("/api/assignment/form/" + formId)
                .success(function (response) {
                    //console.log(response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function  updateFormById(formId, newForm) {
            var deferred = $q.defer();

            console.log(formId);
            $http
                .put("/api/assignment/form/" + formId, newForm)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findFormByFormId (formId) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + formId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();