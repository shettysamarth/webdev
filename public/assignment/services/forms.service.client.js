"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);

    function FormService($rootScope)
    {
        var forms = [
            {"_id": "000", "name": "Contacts", "userId": 123},
            {"_id": "010", "name": "ToDo",     "userId": 123},
            {"_id": "020", "name": "CDs",      "userId": 234},
        ]


        var FormService = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        }

        return FormService;

        function createFormForUser(userId, form, callback) {
            if(form) {
                var newForm = {
                    _id: (new Date).getTime(),
                    name: form.name,
                    userId: userId
                }
                forms.push(newForm);
                callback(newForm);
                return;
            }
            return null;
        }

        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for(var index=0; index<forms.length; index++)
            {
                if(forms[index].userId === userId)
                {
                    userForms.push(forms[index]);
                }

            }
            callback(userForms);
        }

        function deleteFormById(formId, callback) {

            for(var index=0; index<forms.length; index++) {
                console.log(JSON.stringify(forms[index]._id) + " " + JSON.stringify(formId));
                if (JSON.stringify(forms[index]._id) === JSON.stringify(formId)) {

                    console.log("deleting")
                    forms.splice(index, 1);
                }
            }
            var userForms = [];
            for(var index=0; index<forms.length; index++)
            {
                if(forms[index].userId === $rootScope.user._id)
                {
                    userForms.push(forms[index]);
                }

            }
            callback(userForms);

        }

        function  updateFormById(formId, newForm, callback) {
            for(var index=0; index<forms.length; index++)
            {
                if(forms[index]._id === formId)
                {
                    forms[index].name = newForm.name;
                    callback(forms[index]);
                    return;
                }
                callback(null);
            }
        }
    }
})();