const express = require('express')
const api = require('./api.js')

const app = express()
const PORT = 3001

app.get('/', async (req, res) => {
  res.send(await api.main(req))
})

app.get('/user', (req, res)=>{
  res.send(api.user(req))
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
