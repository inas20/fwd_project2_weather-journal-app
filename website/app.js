/* Global Variables */

// weather url and api key
const apiKey = 'aedd289a5b4725ad81f84f894d3e7472';
let url = `http://api.openweathermap.org/data/2.5/weather?zip=`

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) +'/'+ d.getDate() +'/'+ d.getFullYear();


let generateBtn = '';
let zipValue = '';
let feelingsValue = '';
let span = {}

// to check the dom is ready
document.addEventListener('DOMContentLoaded', function () {
    generateBtn = document.getElementById('generate');    
    generateBtn.addEventListener('click', onSubmit);
    span = document.querySelector('span');
})

// callback function onClick generate button
function onSubmit(){
    zipValue = document.getElementById('zip').value;
    feelingsValue = document.getElementById('feelings').value;
    getTemperature(zipValue, feelingsValue).then((result)=>{
        console.log(result)
        if(!!result && result.cod == '404'){
            alert('Please enter valid zip code')
            span.style.display ='block'
            span.innerHTML = result.message
        }else{
            displayUserData('/postUserData',{
                date: newDate,
                temp: parseInt((result?.main?.temp)-273.15),
                content:  feelingsValue
            })
            span.style.display ='none'
            updateUI().then();
        }
       
    }).catch(error=>{
        alert(error)
        console.log('error-------', error)
    })
}

//make a GET request to the OpenWeatherMap API.
const getTemperature = async()=>{
    const baseURL = `${url}${zipValue}&apikey=${apiKey}`;
    let errorMsg =  document.getElementsByTagName('span')[0]
    if(!!zipValue){
        errorMsg.style.display = 'none'
        try{
            const res = await fetch(baseURL)
            const data = res.json()
            return data;
        }catch(error){
            alert("Please Enter valid zip code")
            return error;
        }
    }else{
       errorMsg.style.display = 'block';
       return null;
    }
}


// post userEntry 
const displayUserData = async(path, data)=>{
    try{
        const response = await fetch(path,{
        method: 'post',
        credentials:'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
         return response;
    }catch(error){
        return error;
    }
}

//update UI dynamically after posting
const updateUI = async()=>{
    const request = await fetch('/all');
    try{
       const data =  await request.json();
        if(data){
            document.getElementById('date').innerHTML= "Date  : " + data.date ;
            document.getElementById('temp').innerHTML= "Temperature  : " + data.temp + '°C';
            document.getElementById('content').innerHTML= 'Your Feelings : ' + data.content;
        }
    }catch(error){
        console.log('Error in updating UI ', error)
    }
}