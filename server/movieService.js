const axios = require('axios');
const { response } = require('express');

module.exports.getMovies = async function  (){
    return data = await axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY').then(
        (response)=>{
            console.log(response);
            return response.data;
    })
    .catch(error =>{
        console.log(error);
    })
}


