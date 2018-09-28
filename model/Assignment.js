const { mongoose } = require('../db.js');

const assignmentSchema = new mongoose.Schema({
   userId:{type:mongoose.SchemaTypes.ObjectId,required:true},
   assignedTo:{type:mongoose.SchemaTypes.ObjectId,required:true}
});

module.exports = mongoose.model('Assignment',assignmentSchema);