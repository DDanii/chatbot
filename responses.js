const shell = require("shelljs");
const fs = require("fs");
const login = require("facebook-chat-api");

login({appState: JSON.parse(fs.readFileSync('/stuff/lock/appstate.json', 'utf8'))}, (err, api) => {
    if(err){console.log("asd"); return console.error(err);}
    // Here you can use the api
    api.listen((err, message) => {
        if(err){console.log("asd2"); return console.error(err); }

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
		if(message.body.startsWith("math") || message.body.startsWith("Math")){
			cur=shell.exec("math "+ message.body.split(" ")[1]);
			api.sendMessage(cur.toString() , message.threadID);
		}
		if(message.body.toLowerCase() == "dunno"){
			api.sendMessage("¯\\_(ツ)_/¯", message.threadID);
		}
		if(message.body == "asd.mp4")
			api.sendMessage({attachment: fs.createReadStream("/stuff/asd.mp4") }, message.threadID);
		if(message.body == "rip0.mp4")
                        api.sendMessage({attachment: fs.createReadStream("/stuff/rip0.gif") }, message.threadID);
		if(message.body.split(".")[1] == "gif" )
			api.sendMessage({attachment: fs.createReadStream("/stuff/" + message.body.split(".")[0] + "." + message.body.split(".")[1])}, message.threadID);
		if(message.body.toLowerCase() == "pubip")
			api.sendMessage((shell.exec("pubip")).toString(), message.threadID);
	}
	});
});
