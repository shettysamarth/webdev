"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function  FormController($scope, FormService, $rootScope) {
        FormService.findAllFormsForUser($rootScope.user._id, function(forms)
        {
            $scope.forms = forms;
            console.log(forms);
        });
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;




        function addForm(form) {
            console.log("adding");
            FormService.createFormForUser($rootScope.user._id, form, createFormCallBack);
        }

        function createFormCallBack(form) {
            if(form)
            {
                FormService.findAllFormsForUser($rootScope.user._id,function(forms)
                {
                    $scope.forms = forms;
                });
            }
        }

        function updateForm(form) {
            console.log(form);
            FormService.updateFormById(form._id, form, updateFormCallBack)
        }

        function updateFormCallBack(form)
        {
            console.log(form);
        }

        function deleteForm(index) {
            console.log($scope.forms[index]["_id"]);
            FormService.deleteFormById($scope.forms[index]["_id"], deleteFormCallBack);
        }

        function deleteFormCallBack(forms) {
            console.log(forms);
            $scope.forms = forms;

        }

        function selectForm(index) {
            $scope.selectedForm = $scope.forms[index];
            console.log("selected");
            console.log($scope.forms[index]);

        }
    }
})();

