const shell = require("shelljs");
const fs = require("fs");
const login = require("facebook-chat-api");

login({appState: JSON.parse(fs.readFileSync('/stuff/lock/appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
    // Here you can use the api
    api.listen((err, message) => {
        if(err) return console.error(err);

        // Ignore empty messages (photos etc.)
        if (typeof message.body === "string") {
            if(message.body == ":A")
                        api.sendMessage("( ͡° ͜ʖ ͡°)", message.threadID);
		if(message.body.toLowerCase() == "skip")
                        shell.exec('/bin/skip');
		if(message.body.toLowerCase().startsWith("next "))
                        shell.exec('/bin/next '+message.body.substring(5));
                if(message.body.toLowerCase() == "current"){
                        cur=shell.exec('current');
			api.sendMessage(cur.toString() , message.threadID);
		}
	}
});
});
