module.exports = function (mongoose) {
    var fieldSchema = new mongoose.Schema({
        label : String,
        type : String,
        placeholder :  String,
        options : [{label:STRING, value:STRING}]
            }, {collection : "field"});
    return fieldSchema;
};