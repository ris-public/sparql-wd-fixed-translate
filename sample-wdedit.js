var global_iterno = 0;

function Proceed(){
	console.log("Proceed called: ", global_iterno);
	if(global_iterno<(a.length - 1)){
		try{
			sleep(30);
			global_iterno++;
			fs.appendFileSync("req.txt","Requesting... "+a[global_iterno]+"\r\n");
			wdEdit.description.set(a[global_iterno], 'ta', 'பூச்சி இனம்', Proceed);
		}
		catch (e) {
			console.log("=============================RETRY==========================");
			console.log(e);
			global_iterno--;
			setTimeout(Proceed, 30);
		}
	}
	else {console.log("***GLOBAL*** DONE");
		fs.appendFileSync("range.txt","{start: "+a[0]+", end: "+a[a.length - 1]+"}\r\n");
		fs.appendFileSync("log.txt",JSON.stringify(a,null,4));
		}
}

const config = {
  // Required
username: 'Username',
  password: 'password',

  // Optional
  verbose: true, // Default: false
  //wikibaseInstance: 'https://mywikibase.instance/w/api.php', // Default: https://www.wikidata.org/w/api.php
  userAgent: 'CC0|R BOT' // Default: `wikidata-edit/${pkg.version} (https://github.com/maxlath/wikidata-edit)`
}
const wdEdit = require('wikidata-edit')(config);
const fs = require("fs");
var sleep = require('system-sleep');



// Add the label 'Bac à sable bulgroz' to the Sandbox entity (Q4115189) in French
//wdEdit.description.set('Q4115189', 'ta', 'Bac à sable bulgroz Test_123')


var a = JSON.parse(fs.readFileSync("array.json"));




//a.forEach(function(v,k,a))
wdEdit.description.set(a[0], 'ta', 'பூச்சி இனம்', Proceed);
