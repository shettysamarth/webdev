module.exports = function (mongoose) {

    var userSchema = new mongoose.Schema({
        username:String,
        password:String,
        firstName:String,
        lastName:String,
        emails:[String],
        phones:[String]
    },{collection:"user"});
    return userSchema;
};