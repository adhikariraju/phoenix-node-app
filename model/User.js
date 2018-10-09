const { mongoose } = require('../db.js');

const userSchema = new mongoose.Schema({
    "openid":{type:String,required:true},
    "session_key":String,
    "nickname":String,
    "sex": Number,
    "city": String,
    "province": String,
    "country": String,
    "headimgurl": String,
    "unionId": String,
    "mobile":String,
    "verified":{type:Boolean,default:false},
    "assigned":{type:Boolean,default:false},
    "subscribe_time":{type:Date,default:Date.now()}
});

module.exports = mongoose.model('User',userSchema);
