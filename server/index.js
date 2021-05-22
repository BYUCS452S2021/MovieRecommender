const express = require('express')
const api = require('./api.js')

const app = express()
app.use(express.json())
const PORT = 3001

// Health check
app.get('/', async (req, res) => {
  res.send({'status': 'ok'})
})

// Create a new user
app.post('/user', async (req, res) => {
  try {
    const response = await api.createUser(req.body)
    res.send(response)
  } catch (err) {
    res.status(err.code).send(err.response)
  }
})

// Pair with a partner
app.post('/pair', (req, res) => {
  try {
    const response = api.createPair(req.body)
    res.send(response)
  } catch (err) {
    res.status(err.code).send(err.response)
  }
})

// Get current user's partner (if any)
app.get('/pair', (req, res) => {
  try {
    const response = api.getPair(req.body)
    res.send(response)
  } catch (err) {
    res.status(err.code).send(err.response)
  }
})

// Get a movie to rate
app.get('/movie', (req, res) => {
  try {
    const response = api.getMovie(req.body)
    res.send(response)
  } catch (err) {
    res.status(err.code).send(err.response)
  }
})

// Rate a movie
app.post('/movie', (req, res) => {
  try {
    const response = api.rateMovie(req.body)
    res.send(response)
  } catch (err) {
    res.status(err.code).send(err.response)
  }
})

// Get recommendation for pair
app.get('/recommendation', (req, res) => {
  try {
    const response = api.getRecommendation(req.body)
    res.send(response)
  } catch (err) {
    res.status(err.code).send(err.response)
  }
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
