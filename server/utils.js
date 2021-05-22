const {Client} = require('pg')
const crypto = require('crypto')

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

const hash = password => {
  const sha512 = crypto.createHash('sha512')
  sha512.update(password)
  return sha512.digest('hex')
}

module.exports = {query, makeError, hash}
