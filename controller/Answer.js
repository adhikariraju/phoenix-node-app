var Answer=require("../model/Answer");
exports.saveAnswers=(answers,cb)=>{
   var answer=new Answer(answers);
   answer.save((err,result)=>{
      cb(err,result)     
   })
}