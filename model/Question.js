const { mongoose } = require('../db.js');

// const childrenSchema=new mongoose.Schema({
//     name:String,
//     type:String,
//     label:String
//     });    

// const introQuestSchema = new mongoose.Schema({
//     label:String,
//     name:String,
//     formType:String,
//     type:String,
//     children:{type:[childrenSchema],default:[]},
//     options:{type:[optionsSchema],default:[]} 
//     })

// const answerSchema=new mongoose.Schema({
//     formType:{type:String,default:"radio"},
//     content:{type:String,required:true}
// })   

const optionsSchema=new mongoose.Schema({
    label:String,
    name:String,
    formType:{type:String,default:""},
    placeholder:String,
    value:mongoose.SchemaTypes.Mixed
});

const introquestSchema=new mongoose.Schema({
    label:{type:String,required:true},
    formType:{type:String,required:true},
    name:String,
    placeholder:String,
    options:{type:[optionsSchema],default:[]}
})  
// difference is in core question
// default form-type is radio
const corequestSchema=new mongoose.Schema({
    label:{type:String,required:true},
    formType:{type:String,default:"radio"},
    name:String,
    placeholder:String,
    options:{type:[optionsSchema],default:[]}
})  

const questionSchema = new mongoose.Schema({
    type:{type:String,required:true},
    introQuestions:{type:[introquestSchema]},
    questions:{type:[corequestSchema],required:true},
    viewedBy:[{userId:String}],
    createdAt:{type:String,default:Date.now()},
    dueDate:{type:Date,required:true}        
});

module.exports = mongoose.model('Question',questionSchema);