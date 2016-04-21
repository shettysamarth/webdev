var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports=function(app,userModel){

    var auth = authorized;

    var authAdmin = authorizedAdmin;

    app.post  ('/api/assignment/user/login', passport.authenticate('local'), login);
    app.get('/api/assignment/user/loggedin',loggedin);
    app.get('/api/assignment/user/logged_in',logged_in);
    app.post  ('/api/assignment/user/register',register);
    app.post('/api/assignment/user/logout', logout);
    app.post('/api/assignment/user',auth,createUser);
    app.get('/api/assignment/user/:id',auth,getUserByID);
    app.put('/api/assignment/user/:id',auth,updateUserByID);
    app.delete('/api/assignment/user/:id',auth,deleteUserByID);


    //Admin
    app.post('/api/assignment/admin/user',authAdmin,createUser);
    app.get('/api/assignment/admin/user/:id',authAdmin,getUserByID);
    app.get('/api/assignment/admin/user',authAdmin,getAllUsers);
    app.delete('/api/assignment/admin/user/:id',authAdmin,deleteUserByID);
    app.put('/api/assignment/admin/user/:id',authAdmin,updateUserByID);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    console.log( "err" + err);
                    if (err) {
                        return done(err);
                    }
                    return done(null, false);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function createUser(req,res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 0) {
            //newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        userModel.addNewUser(newUser)
            .then(function(success){
                res.json(success);
            }, function(err){
                res.status(400).send(err);
            });
    }

    function getAllUsers(req,res) {
        userModel.findAllUsers()
            .then(function(users){
                res.json(users);
            }, function(err){
                res.json(err);
            });
    }


    function getUserByID(req,res) {
        var userID=req.params.id;
        userModel.findUserByID(userID)
            .then(function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function updateUserByID(req,res) {
        var newUser = req.body;
        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function deleteUserByID(req,res) {
            userModel
                .deleteUser(req.params.id)
                .then(
                    function(success){
                        res.json(success);
                    },function(err){
                        res.status(400).send(err);
                    });
    }

    function logged_in(req,res) {
        var user=req.user;
        if(!user) {
            res.json(null);
        }else{
            res.json(user);
        }
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        console.log("register called");
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    console.log("user here");
                    console.log(user);
                    if(user) {
                        res.status(401).send("user already present");
                    } else {
                        return userModel.addNewUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        console.log(user);
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };


    function authorizedAdmin (req, res, next) {
        if (!req.isAuthenticated() || !isAdmin(req.user)) {
            res.send(403);
        } else {
            next();
        }
    };

}