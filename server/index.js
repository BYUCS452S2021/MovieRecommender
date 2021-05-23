const express = require('express')
const cors = require('cors')
const api = require('./api.js')

const PORT = 3001

const app = express()
app.use(cors())
app.use(express.json())

// Health check
app.get('/', async (req, res) => {
  res.send({'status': 'ok'})
})

// Login
app.post('/login', async (req, res) => {
  try {
    const response = await api.login(req.body)
    res.send(response)
  } catch (err) {
    res.status(err.code).send(err.response)
  }
})

// Logout
app.get('/logout', async (req, res) => {
  try {
    const response = await api.logout({token: req.header('Authorization')})
    res.send(response)
  } catch (err) {
    res.status(err.code).send(err.response)
  }
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
app.post('/pair', async (req, res) => {
  try {
    const response = await api.createPair({
      token: req.header('Authorization'),
      ...req.body
    })
    res.send(response)
  } catch (err) {
    res.status(err.code).send(err.response)
  }
})

// Get current user's partner (if any)
app.get('/pair', async (req, res) => {
  try {
    const response = await api.getPair({
      token: req.header('Authorization'),
      ...req.body
    })
    res.send(response)
  } catch (err) {
    res.status(err.code).send(err.response)
  }
})

// Get a movie to rate
app.get('/movie', async (req, res) => {
  try {
    const response = await api.getMovie({
      token: req.header('Authorization'),
      ...req.body
    })
    res.send(response)
  } catch (err) {
    res.status(err.code).send(err.response)
  }
})

// Rate a movie
app.post('/movie', async (req, res) => {
  try {
    const response = await api.rateMovie({
      token: req.header('Authorization'),
      ...req.body
    })
    res.send(response)
  } catch (err) {
    res.status(err.code).send(err.response)
  }
})

// Get recommendation for pair
app.get('/recommendation', async (req, res) => {
  try {
    const response = await api.getRecommendation({
      token: req.header('Authorization'),
      ...req.body
    })
    res.send(response)
  } catch (err) {
    res.status(err.code).send(err.response)
  }
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
