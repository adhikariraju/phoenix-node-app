const { mongoose } = require('../db.js');
var Doctor=require("./Doctor");
var User=require("./User")
const assignmentSchema = new mongoose.Schema({
   user:{type:mongoose.SchemaTypes.ObjectId,required:true, ref:'User'},
   doctor:{type:mongoose.SchemaTypes.ObjectId,required:true, ref:'Doctor'}
});

module.exports = mongoose.model('Assignment',assignmentSchema);