"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function  FormController($scope, FormService, $rootScope) {
        getUserForms();
        function getUserForms()
        {
            FormService.findAllFormsForUser($rootScope.user._id).then(function(forms)
            {
                $scope.forms = forms;
                console.log("forms" +forms);
                console.log(forms);
            });
        }
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(form) {
            console.log(form);

            FormService.createFormForUser($rootScope.user._id, form)
                .then (createFormCallBack);
        }

        function createFormCallBack(form) {
            if(form)
            {
                FormService.findAllFormsForUser($rootScope.user._id).then(function(forms)
                {
                    $scope.forms = forms;
                });
            }
        }

        function updateForm(form) {
            console.log(form);
            $scope.selectedForm.title = form.title;
            FormService.updateFormById($scope.selectedForm._id, $scope.selectedForm).then (updateFormCallBack)
        }

        function updateFormCallBack(form)
        {
            getUserForms();
        }

        function deleteForm(index) {
            //console.log($scope.forms[index]["id"]);
            FormService.deleteFormById($scope.forms[index]["_id"]).then(deleteFormCallBack);
        }

        function deleteFormCallBack(forms) {
            getUserForms();
        }

        function selectForm(index, form) {

            $scope.selectedForm = $scope.forms[index];
            console.log($scope.selectedForm);
            $scope.form = {title: $scope.selectedForm.title};
            console.log("selected");
            console.log($scope.forms[index]);
        }
    }
})();

