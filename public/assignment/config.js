(function()
{
    angular
        .module("FormBuilderApp")
        .config(function ($routeProvider) {
           $routeProvider
               .when("/", {
                   templateUrl : "views/home/home.view.html"
               })
               .when("/home", {
                   templateUrl : "views/home/home.view.html",
                   controller : "HomeController"
               })
               .when("/profile", {
                   templateUrl : "views/profile/profile.view.html",
                   controller : "ProfileController"
               })
               .when("/admin", {
                   templateUrl : "views/admin/admin.view.html",
                   controller : "AdminController"
               })
               .when("/forms", {
                   templateUrl : "views/forms/forms.view.html",
                   controller : "FormController"
               })
               .when("/login", {
                   templateUrl : "views/users/login.view.html",
                   controller : "LoginController"

               })
               .when("/profile", {
                   templateUrl : "views/users/profile.view.html",
                   controller : "ProfileController"
               })

               .when("/fields",{
                   templateUrl : "views/forms/form-fields.view.html",
                   controller : "FieldsController"
               })

               .when("/register", {
                   templateUrl : "views/users/register.view.html",
                   controller : "RegisterController"
               });
        });
})();