const express = require('express')
const https = require('https')	
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){

	
	res.sendFile(__dirname+"/index.html");
})

app.post('/',function(req,res){
	var city = req.body.city
	const url = 'https://api.openweathermap.org/data/2.5/find?q='+city+'&units=metric&APPID=cff6b43aafa37dd07cafc6fea33d3bd5&unit=metric'
	https.get(url,function(response){
		console.log(response.statusCode);

		response.on("data",function(data){
			const weatherData = JSON.parse(data)
			const temp = weatherData.list[0].main.temp
			const desc = weatherData.list[0].weather[0].description
			console.log(temp)
			console.log(desc)

		res.write("<h1>Temperature in "+city+" is "+temp+" degrees Celsius</h1>");
		res.write("Description of weather in "+city+" is : "+desc);
		res.send()
		})
	})
	
})

app.listen(3000,function(){
	console.log("Server running at 3000");
})