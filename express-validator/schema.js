const { check } = require('express-validator/check');
const Question =require("@model/Question");

exports.signup = [
    check('encryptedData', 'Encrypted Data is required').exists(),
    check('iv', 'IV is required').exists()
];



exports.question={
    putIntroQuestion:[
        check('parentId',':parentId param is required').exists(),
        check('introId',':introId param is required').exists(),
        // check('question','question to be updated is required').exists()
    ],
    putCoreQuestion:[
        check('parentId',':parentId param is required').exists(),
        check('coreId',':coreId param is required').exists(),
        // check('question','question to be updated is required').exists()
    ],
    postQuestion:[
        check('type').exists().withMessage("Type is required")
        //   .custom(value=>{
        //     Question.findOne({type:value}).then(question=>{
        //        if(question){
        //           new Error("Question Already Exist")
        //        }
        //    }) 
        // })
        ,
        check('coreQuestions',"Core Questions are required").exists(),
        check('dueDate','Due date is required').exists(),
        check('introQuestions','IntroQuestions are required').exists(),
        
    ]
}