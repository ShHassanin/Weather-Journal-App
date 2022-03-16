/* Global Variables */
var temp = [];
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
var apikey ='ab784c00b1383263af8f7a2316436a3f';
var baseURL =`http://api.openweathermap.org/data/2.5/weather?zip=`;
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', action);
/* Function called by event listener */
function action(){
    let newZip=document.getElementById('zip').value;
    const feelings=document.getElementById('feelings').value;
    if (newZip === ""){alert('Enter a zip code, please')
    }else{getData(baseURL,newZip,apikey)
        .then(function (temp){
                            console.log(temp);
                            postData('/all',{
                                date:newDate ,
                                temp:temp ,
                                feelings:feelings
                            });
        })
        .then( ()=>{updateUI()
        })
    };
};
 
/* Function to GET Web API Data*/
const getData = async (baseURL,zip,apikey)=>{
    const req = await fetch(baseURL+zip+'&units=metric&appid='+apikey)
    try {
        const res= await req.json();
        temp=(res.main.temp);
        console.log(temp);
        return temp;
    }catch(error){ if(error.message =404){
                    alert('Error: Please enter a valid zip code for USA');
                }
    }
};
/* Function to POST data */
const postData= async (url='',data={})=>{
    console.log(data)
    const req = await fetch(url,{
        method: 'post',
        credentials:"same-origin",
        headers:{'content-type':'application/json'},
        body: JSON.stringify(data)
    });

    try {
        return;
    }catch(error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/projectData');
    try{
        
      const projectData = await request.json();
      console.log(projectData);
      document.getElementById('date').innerHTML = `Date :  ${projectData.Date}`;
      document.getElementById('temp').innerHTML = `Temp :  ${projectData.Temp}`;
      document.getElementById('content').innerHTML = "Feelings : " + projectData.Feelings;
  
    }catch(error){
      console.log("error", error);
    }
}