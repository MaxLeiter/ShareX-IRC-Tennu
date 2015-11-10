var tennu = require('tennu');
var winston = require('winston');
var config = require('./config/ShareX.json');

var Client = tennu.Client;

var bot = Client(config);


var winston = require('winston');
var logger = new(winston.Logger)({
    transports: [
    new(winston.transports.Console)(),
    new(winston.transports.File)({filename: 'irc.log'})
    ]
});

bot.on('join', function (message) {
    logger.log("info", message.nickname + ' joined ' + message.channel);
});

var endTime;
bot.on('privmsg', function (message) {
    logger.log("info", message.nickname + ': ' + message.message);


});

bot.connect();

