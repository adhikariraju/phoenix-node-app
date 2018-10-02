const { check } = require('express-validator/check');

exports.signup = [
    check('encryptedData', 'Encrypted Data is required').exists(),
    check('iv', 'IV is required').exists()
];

exports.postQuestion = [
    check('type', 'Question type is required').exists(),
    check('introQuestions', 'Intro Questions are required').exists(),
    check('questions', 'Questions are required').exists(),
    check('dueDate', 'Questions are required').exists()
]