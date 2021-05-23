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

// Call this before any method requiring authentication
// If credentials are invalid, the function will throw
const checkAuth = async (userId, password) => {
  if (!userId || !password) {
    throw makeError(401, 'Could not authenticate')
  }
  const response = await query('SELECT hash FROM "User" WHERE id = $1', [userId])
  if (hash(password) !== response.rows[0].hash) {
    throw makeError(401, 'Could not authenticate')
  }
}

module.exports = {query, makeError, hash, checkAuth}
