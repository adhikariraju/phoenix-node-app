const { mongoose } = require('../db.js');

const answerSchema=new mongoose.Schema({
    type:{type:String,required:true},
    content:{type:String,required:true}
})

const subquestSchema=new mongoose.Schema({
    question:{type:String,required:true},
    answers:[answerSchema]
})

const questionSchema = new mongoose.Schema({
    type:{type:String,required:true},
    questions:[subquestSchema]

});

module.exports = mongoose.model('Question',questionSchema);
