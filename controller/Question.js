var Question=require("../model/Question");


exports.getQuestionByType=(type,cb)=>{
  Question.findOne({type:type},(err,result)=>{       
       cb(err,result);
  })
};

exports.getQuestionById=(id,cb)=>{
  Question.find({_id:id},(err,result)=>{
    cb(err,result); 
  })
};

exports.getAllQtypes=(cb)=>{
  Question.find({},{type:1},(err,result)=>{
    cb(err,result);
  })
};

exports.getAllQuestion=(data,cb)=>{
  
  Question.aggregate([
    {
      $project:{
        introQuestions:1,
        coreQuestions:1,
        type:1,
        createdAt:1,
        dueDate:1,
        viewed:{
          $cond:[{$in:[data.userId,"$viewedBy.userId"]},true,false]         
        }
      }
    }
  ]).exec((err,result)=>{
    cb(err,result)    
  })
}



exports.postQuestion=(quest,cb)=>{
      var data={
        type:quest.type,
        coreQuestions:quest.coreQuestions,
        introQuestions:quest.introQuestions,
        dueDate:Date.parse(quest.dueDate)
      };
      
      var question=new Question(data);
      question.save((err,result)=>{
         cb(err,result);
      });
};

exports.addCoreQuestion=(parentId,question,cb)=>{
  Question.findOne({_id:parentId},(err,result)=>{
    if(err){
      res.status(500).send({
        message:"Error while finding the parent document"
      })
    }
    
    else if(result){
      result.coreQuestions.push(question);
      result.save((err,result)=>{
        cb(err,result);
      })
    }
    else{
      res.status(500).send({
        message:"Parent Quesion not found"
      })
    }     
 })
};

exports.addIntroQuestion=(parentId,question,cb)=>{
  Question.findOne({_id:parentId},(err,result)=>{    
    //if error while fetching data from questionnaire
    if(err){
      res.status(500).send({
        message:"Error while finding the parent document"
      })
    }

     //if parentId is in the list.
    else if(result){
       result.introQuestions.push(question);

       result.save((err,result)=>{
          return cb(err,result);
       })
    }

    else{     
      res.status(500).send({
        message:"Parent question not found"
      })
    }
  })  
}
//update options

exports.markAsViewed=(data,cb)=>{
  Question.findByIdAndUpdate({_id:data.questionSetId},
                             {$push:{viewedBy:{userId:data.userId}}},
                             (err,result)=>{
                               cb(err,result)
                              }); 
}

exports.updateCoreQuest=(parentId,coreId,question,cb)=>{

  Question.findOneAndUpdate(
    {"_id":parentId,"coreQuestions._id":coreId},
    {$set:{"coreQuestions.$":question}},
    {new:true},
    (err,result)=>{
      cb(err,result)
    }   
  )
}

exports.updateIntroQuest=(parentId,introId,question,cb)=>{
  Question.findOneAndUpdate(
    {"_id":parentId,"introQuestions._id":introId},
    {$set:{"introQuestions.$":question}},
    {new:true},
    (err,result)=>{
      cb(err,result)
    }   
  )
};


//Delete


exports.deleteById=(id,cb)=>{
  Question.findOneAndDelete({_id:id},(err,result)=>{
    cb(err,result);
  })
}

exports.deleteCore=(parentId,coreId,cb)=>{
  Question.findOne({_id:parentId},(err,result)=>{
    if(result){
      result.coreQuestions.id(coreId).remove();
      return result.save((err,result)=>{
         cb(err,result);
      });      
    }
    cb(err,result);
  })
}

exports.deleteIntro=(parentId,introId,cb)=>{
  Question.findOne({_id:parentId},(err,result)=>{
    console.log("rsult",result);
    if(result){
      console.log("delete intro ",result)
      console.log("delete intro ",result.introQuestions)
      result.introQuestions.id(introId).remove();
      return result.save((err,result)=>{
         cb(err,result);
      });
    }
    cb(err,result);
  })

    // Question.update({
    //   _id: parentId
    // }, {
    //   $pull: {
    //     introQuestions: {
    //       _id: introId
    //     }
    //   }
    // },(err,result)=>{
    //   cb(err,result)
    // });

}