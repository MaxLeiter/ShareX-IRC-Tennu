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
	console.log('serialize() fired');
	var txt = JSON.stringify(nicklist);
	fs.writeFile('nicklist.log', txt, {}, function(err) {
		if (err) throw err;
	});
};

var loadLastState = function() {
	console.log('loadLastState() fired');
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
	console.log('addToList() fired');
	var record = { 
		"timestamp" : new Date(),
		"channel": message.channel,
	};
	if(!nicklist.hasOwnProperty(message.nickname.toLowerCase())) {
		nicklist[message.nickname.toLowerCase()] = record;
		bot.notice(message.nickname, "Welcome, " + message.nickname + "! I think it's your first time here; if you have a question, please ask and wait for a response. There isn't always someone reading the chat!");
		serialize();
	}

}

loadLastState();
process.on('exit', serialize);


bot.on('join', function (message) {
	logger.log("info", message.nickname + ' joined ' + message.channel);
	addToList(message);
});

var endTime;

bot.on('privmsg', function (message) {
	logger.log("info", message.nickname + ': ' + message.message);

});

bot.connect();

