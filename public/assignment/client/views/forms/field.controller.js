"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function  FieldController($scope, $rootScope,FieldService, $routeParams) {
        var model = this;
        model.options = [
            {name: "Single Line Text Field", value: "SINGLE-LINE-TEXT"},
            {name: "Multi Line Text Field", value: "MULTI-LINE-TEXT"},
            {name: "Date Field", value: "DATE"},
            {name: "Dropdown Field", value: "DROPDOWN"},
            {name: "Checkboxes Field", value: "CHECKBOX"},
            {name: "Radio Buttons Field", value: "RADIO"}];
        var sortableEle;

        var formId = $routeParams.formId;

        model.updateField = updateField;
        model.deleteField = deleteField;
        model.createNewField = createNewField;

        function deleteField(index)
        {
            var fieldId = model.fields[index]["id"];
            FieldService.deleteFieldByFieldAndFormId(formId, fieldId)
                .then (function(fields){

                    model.fields.splice(index,1);
                });
        }

        $scope.sortableFields = {
            disabled: false,
            update: function(event) {
                //console.log(event);
                FieldService.updateAllFieldsOfFormId(formId, model.fields).then(function(fields)
                {});
                return true;
            }
        };

        function getFields() {
            FieldService.findAllFieldsForFormId(formId).then(function(fields)
            {
                console.log(fields);
                model.fields = fields;
            });

        }


        getFields();

        function updateField(field)
        {

        }




        function createNewField() {
            if(model.fieldType){


                var newField = {}
                if (model.fieldType.value === "SINGLE-LINE-TEXT") {
                    newField._id = null;
                    newField.label = "New Text Field";
                    newField.type = "TEXT";
                    newField.placeholder = "New Field";
                } else if (model.fieldType.value === "MULTI-LINE-TEXT") {
                    newField._id = null;
                    newField.label = "New Text Field";
                    newField.type = "TEXTAREA";
                    newField.placeholder = "New Field";
                } else if (model.fieldType.value === "DATE") {
                    newField._id = null;
                    newField.label = "New Date Field";
                    newField.type = "DATE";
                } else if (model.fieldType.value === "DROPDOWN") {
                    newField._id = null;
                    newField.label = "New Dropdown";
                    newField.type = "OPTIONS";
                    newField.options = [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ];
                } else if (model.fieldType.value === "CHECKBOX") {
                    newField._id = null;
                    newField.label = "New Checkboxes";
                    newField.type = "CHECKBOXES";
                    newField.options = [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ];
                } else if (model.fieldType.value === "RADIO") {
                    newField._id = null;
                    newField.label = "New Radio Buttons";
                    newField.type = "RADIOS";
                    newField.options = [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ];
                } else {
                    // do nothing

                }
            }


            FieldService
                .createNewFieldForFormId(formId, newField)
                .then(function(fields){
                    //console.log(field);
                    model.fields = fields;
                });
        }





    }
})();

