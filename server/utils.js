const {Client} = require('pg')

// See https://node-postgres.com/features/queries for details about writing/reading queries
const query = (...args) => {
  const client = new Client({
    host: 'localhost',
    database: 'MovieRecommender',
    port: 5432
  })
  client.connect()
  return client.query(...args).finally(() => client.end())
}


const makeError = (code, message) => ({
  code,
  response: {
    error: message
  }
})

module.exports = {query, makeError}
