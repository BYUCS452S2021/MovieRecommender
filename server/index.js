const express = require('express');
const movieService = require('./movieService');

const app = express()
const PORT = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user/:userId', (req, res)=>{
  console.log(req.params);
  res.send("User Page coming soon.");
})

app.get('/user/:userId/ratemovies', (req, res)=>{
  movieService.getMovies().then(
    (response) => {
      console.log(response);
      res.send(response);
    }
  );
  //res.send("here are some movies for you to rate.")
})

app.get('/user/:userId/', (req, res)=>{
  res.send("here are some movies for you to rate.")
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
