var tennu = require('tennu');
var winston = require('winston');
var config = require('./config/ShareX.json');
var fs = require('fs');
var lodash = require('lodash');

var Client = tennu.Client;

var bot = Client(config);

var nicklist = {};

var winston = require('winston');
var logger = new(winston.Logger)({
	transports: [
	new(winston.transports.Console)(),
	new(winston.transports.File)({filename: 'irc.log'})
	]
});

var serialize = function() {
	var txt = JSON.stringify(nicklist, null, 4);
	fs.writeFile('nicklist.log', txt, {}, function(err) {
		if (err) throw err;
	});
};

var loadLastState = function() {
	fs.readFile('nicklist.log', {}, function(err, data) {
		if (err) {
			console.log("Unable to read log file");
			return;
		}
		var oldList = JSON.parse(data);
		nicklist = lodash.defaults(nicklist, oldList);
	});
};

var addToList = function(message) {
		var record = { 
			"timestamp" : new Date(),
			"channel": message.channel,
		};
		nicklist[message.nickname.toLowerCase()] = record;
}

loadLastState();
process.on('exit', serialize);


bot.on('join', function (message) {
	logger.log("info", message.nickname + ' joined ' + message.channel);
	loadLastState();
	if(nicklist.hasOwnProperty(message.nickname)) {
		addToList(message);\
		serialize();
	} 
});

var endTime;

bot.on('privmsg', function (message) {
	logger.log("info", message.nickname + ': ' + message.message);

});

bot.connect();

