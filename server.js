const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


const items = require('./Routes/api/items');

const app = express();


//BodyParser Middleware

app.use(bodyParser.json());

//DB config

const db = require('./config/keys').mongoURI;

// Connect to Mongo

mongoose.connect(db)
	.then(()=> console.log('connected . . .'))
	.catch(err => console.log(err));

	//Use Routes

	app.use('/api/items',items);


	const port = process.env.PORT || 5000;

	if (process.env.NODE_ENV === 'production') {
	  // Serve any static files
	  app.use(express.static(path.join(__dirname, 'client/build')));
	  // Handle React routing, return all requests to React app
	  app.get('*', function(req, res) {
	    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	  });
	}

	app.listen(port,()=> console.log('Server started on port :' + port));

