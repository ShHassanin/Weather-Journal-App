// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express= require('express');
const bodyParser= require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors= require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port=8888
// Spin up the server
const serv =app.listen(port,listening);
// Callback to debug
function listening(){
    console.log(`server is running on localhost: ${port}`);
}
// Initialize all route with a callback function
app.post('/all',receiveData)
// Callback function to complete GET '/all'
function receiveData(req,res){
    let newData = req.body;
    projectData["Date"]=newData.date;
    projectData["Temp"]=newData.temp;
    projectData['Feelings']=newData.feelings;
    console.log(projectData);
    
};
// Post Route
app.get('/projectData', (request,response)=>{
    console.log(projectData);

    response.send(projectData);
 });