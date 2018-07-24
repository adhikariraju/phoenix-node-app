var WechatAPI = require('wechat-api');
var config = require('../config/config');

var api = new WechatAPI(config.APPID, config.APPSECRET);
module.exports=api;