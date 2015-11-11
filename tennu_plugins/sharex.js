var format = require("util").format;
var winston = require('winston');
var index = require('../index');

var ShareXPlugin = {
    init: function (client, imports) {
        return {
            exports: {
            },

            handlers: {
                "!sharex": function (command) {
                    var args = command.args;
                    if(args.length > 0) {
                        return format("%s: https://www.getsharex.com", args[0]);
                    } else {
                        return "https://www.getsharex.com";
                    }
                },
                "!github": function (command) {
                    var args = command.args;
                    if(args.length > 0) {
                        return format("%s: https://www.github.com/ShareX/ShareX", args[0]);
                    } else {
                        return "https://www.github.com/ShareX/ShareX";
                    }
                },
                "!issues": function (command) {
                    var args = command.args;
                    if(args.length > 0) {
                        return format("%s: https://www.github.com/ShareX/ShareX/issues", args[0]);
                    } else {
                        return "https://www.github.com/ShareX/ShareX/issues";
                    }
                },
                "!steam": function (command) {
                    var args = command.args;
                    if(args.length > 0) {
                        return format("%s: http://store.steampowered.com/app/400040", args[0]);
                    } else {
                        return "http://store.steampowered.com/app/400040";
                    }
                },
                "!download": function (command) {
                    var args = command.args;
                    if(args.length > 0) {
                        return format("%s: https://getsharex.com/downloads", args[0]);
                    } else {
                        return "https://getsharex.com/downloads";
                    }                },
                "error": function (error) {
                    index.logger.log("error", "ShareX Plugin crashed!");
                }
            },

            commands: ["sharex, github, issues, steam, download"]
        }
    }
};

module.exports = ShareXPlugin;