const express = require('express')

const app = express()
const PORT = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user', (req, res)=>{
  res.send("User Page coming soon.");
})


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
