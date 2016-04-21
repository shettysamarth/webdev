module.exports = function (mongoose) {
    var bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;
    var userSchema = new mongoose.Schema({
        username:{type:String, index: { unique: true }},
        password:String,
        firstName:String,
        lastName:String,
        emails:[String],
        phones:[String],
        roles: [String]
    },{collection:"user"});

    userSchema.pre('save', function(next) {
        var user = this;

        console.log("in preSave");
        console.log("modified :" + user.isModified);


        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();


        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    });

    userSchema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };
    return userSchema;
};