// // Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Setup Server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express()
const port = 5501;

// Initialize the main project folder
app.use(express.static('website'));

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/all', (req, res) => {
  res.send(projectData);
  console.log('Get all Content=====', projectData)
  projectData = {}
})


// callback function when posting
const displayUserData =(req,res)=>{
  let newData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
  }
  projectData = {...newData};
  console.log('Posting coming data=======', newData)
}

// post user data entry
app.post('/postUserData', displayUserData);

// Console log as callback for listening to project port
app.listen(port, () => {
  console.log(`Weather Journal app listening at http://localhost:${port}`)
})