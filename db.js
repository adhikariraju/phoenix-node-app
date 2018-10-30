var mongoose=require('mongoose');
var config=require('@config/config')
var bluebird = require('bluebird')

var isdev = process.env.NODE_ENV !== 'production';

mongoose.Promise=bluebird;
mongoose.connect(isdev?config.db_dev:config.db,
      {  useCreateIndex: true,
        useNewUrlParser:true});

var db=mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected to database');
})

module.exports={mongoose};