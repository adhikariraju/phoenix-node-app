const { mongoose } = require('../db.js');

const doctorSchema = new mongoose.Schema({
    "openid": { type: String, required: true },
    "session_key": String,
    "nickname": String,
    "sex": Number,
    "city": String,
    "province": String,
    "country": String,
    "headimgurl": String,
    "unionId": String,
    "mobile": String,
    "subscribe_time":{type:Date,default:Date.now()},   
});

module.exports = mongoose.model('Doctor', doctorSchema);