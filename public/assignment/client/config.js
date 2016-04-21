(function()
{
    angular
        .module("FormBuilderApp")
        .config(function ($routeProvider) {
           $routeProvider
               .when("/home", {
                   templateUrl : "views/home/home.view.html",
                   controller : "HomeController",
                   controllerAs: "model",
                   resolve: {
                       loggedin: checkCurrentUser
                   }
               })
               .when("/profile", {
                   templateUrl : "views/profile/profile.view.html",
                   controller : "ProfileController",
                   controllerAs: "model",
                   resolve: {
                       checkLoggedIn: checkLoggedIn
                   }
               })
               .when("/admin", {
                   templateUrl : "views/admin/admin.view.html",
                   controller : "AdminController",
                       controllerAs: "model",
                   resolve: {
                       loggedin: checkAdmin
                   }
               })
               .when("/forms", {
                   templateUrl : "views/forms/forms.view.html",
                   controller : "FormController",
                   controllerAs: "model",
                   resolve: {
                       checkLoggedIn: checkLoggedIn
                   }
               })
               .when("/login", {
                   templateUrl : "views/users/login.view.html",
                   controller : "LoginController",
                   controllerAs: "model"

               })
               .when("/profile", {
                   templateUrl : "views/users/profile.view.html",
                   controller : "ProfileController",
                   controllerAs: "model"
               })

               .when("/field",{
                   templateUrl : "views/forms/field.view.html",
                   controller : "FieldController",
                   controllerAs: "model"
               })
               .when("/form/:formId/fields", {
                   templateUrl: "views/forms/field.view.html",
                   controller: "FieldController",
                   controllerAs: "model",
                   resolve: {
                       checkLoggedIn: checkLoggedIn
                   }
               })

               .when("/register", {
                   templateUrl : "views/users/register.view.html",
                   controller : "RegisterController",
                   controllerAs: "model"
               })
               .otherwise({
                   redirectTo: "/home"
               });

        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/user/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;

            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/user/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                user.emails=user.emails.join(",");
                user.phones=user.phones.join(",");
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.path('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        $http.get('/api/assignment/user/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });
        return deferred.promise;
    };

})();