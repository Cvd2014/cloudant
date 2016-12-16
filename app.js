require('dotenv').load();

var Cloudant = require('cloudant');

var username=process.env.cloudant_username;
var password= process.env.cloudant_password;

var cloudant=Cloudant({account:username, password:password});

var ciaran= cloudant.db.use('ciaran');
var request= require('request');

request('http://www.omdbapi.com/?t=Love+Actually&y=&plot=short&r=json', function getMovie(error, response, body) {
 	if(!error&&response.statusCode==200){
 		//console.log(body)
 		var obj= JSON.parse(body);
 		console.log(obj);
 		ciaran.insert(obj, function(err, body, header){
 			if (err){
 				return console.log('[ciaran.insert]', err.message);
 			}
 			console.log("you have inserted the movie");
 			console.log(body);
 		})
 	}
 })

