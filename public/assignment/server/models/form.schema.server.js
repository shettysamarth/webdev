module.exports = function(mongoose, fieldSchema){
    var formSchema = new mongoose.Schema({
        userId : String,
        title : {type : String, default: "New Form"},
        fields : [fieldSchema],
        created : {type : Date, default: Date.now},
        updated : {type : Date, default: Date.now}
    },{collection : "form"});
    return formSchema;
};