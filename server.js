const express = require('express');
const app = express();
const fs = require('fs');
const Fuse = require('fuse.js');
const url = require('url');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors')

// CORS, currently disabled
const whitelist = ['https://ingus-t.github.io', 'https://slackappchallenge.slack.com']
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
		callback(null, true)
    } else {
		callback(null, true)
		//callback(new Error('Not allowed by CORS policy!'))
    }
  }
}

app.use(cors())
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// get object size
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// get a better variable type information for debugging
var toType = function(obj) {
  return "Debugging variable type: " + ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase() + ", " + typeof(obj) + '\n'
}

// convert JSON from fuse.js format to Slack format
function convert_json(value){
	//console.log(JSON.stringify(value))
	var score = 1 - value.score
	score = Math.round(score  * 10000) / 10000	
	new_array.push("\n\n*Q: " + value.item.question + "* (Question match: " + score + ") \nA: " + value.item.answer)
}

// search in the dataset based on user search parameters
function search_db(searchquery, chosen_threshold, res)
{
	// read and parse database files
	var transcript = fs.readFileSync("./data/transcript.js", "utf8");
	var database = JSON.parse(transcript)	
	
	const options = {
		keys: ['question', 'answer'],
		threshold: chosen_threshold,
		includeScore: true,
		location: 0,
		distance: 300,
		minMatchCharLength: searchquery.length
	};

	var fuse = new Fuse(database, options)
	var output = fuse.search(searchquery)

	// return 10 best results, from 0th to 9th
	output = output.slice(0, 10);

	new_array = []
	output.map(convert_json);

	res.write("Your search query was: `" + searchquery + "`, error threshold: `" + chosen_threshold + "`")
	for (i = 0; i < new_array.length; i++) { 
		res.write(String(new_array[i]))
	}
	res.end()
}

// POST processing for the Slack app
app.post('/', cors(corsOptions), function(req, res){
	// Response type
	res.setHeader('Content-Type', 'application/json');
	res.status(200)
    // Request methods we allow
    res.setHeader('Access-Control-Allow-Methods', 'POST');
	
	var str = req.body.text
	var searchquery = ''
	var threshold = ''

	// show help
	if (str == 'help' || str == '-h' || str == 'h')
	{
		console.log(req.headers.host + " " + req.headers.origin)
		res.write("Welcome to AMAdillo App help :)\n")
		res.write("Error threshold is a value between 0 and 1. The smaller it is, the more precise (and fewer) results will be returned.\n")
		res.write("You can use 2 parameters (search query and error threshold): */amadillo what is this? | 0.5*\n")
		res.write("Or 1 parameter: */amadillo what is this?*\n")
		res.end();
	}
	else
	// process the request
	{
		// get the "text" string and split it
		var parts = str.split("|")
		console.log(JSON.stringify(parts))
	
		if (parts.length == 1)
		{
			searchquery = parts[0]
			threshold = 0.4
			search_db(searchquery, threshold, res)
		}
		else if(parts.length == 2)
		{
			searchquery = parts[0]
			threshold = parts[1]
			search_db(searchquery, threshold, res)
		}
		else
		{
			res.write("Invalid search query. Only 1 or 2 parameters are allowed. \n You can use */amadillo help* to find details")
			res.end();
		}
	}
});

// Listen to the AppEngine/Heroku - specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server listening on port ${PORT}...');
});