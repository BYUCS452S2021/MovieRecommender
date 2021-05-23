const {Client} = require('pg')
const crypto = require('crypto')
const {v4: uuidv4} = require('uuid')

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

const genToken = () =>
  hash(uuidv4())

// Call this before any method requiring authentication
// If credentials are invalid, the function will throw
const checkAuth = async token => {
  if (!token) {
    throw makeError(401, 'Missing token')
  }
  const response = await query('SELECT "user" FROM "AuthToken" WHERE token = $1 AND valid = $2', [token, true])
  const userId = response.rows[0]?.user
  if (userId) {
    return userId
  }
  throw makeError(401, 'Could not authenticate')
}

module.exports = {query, makeError, hash, genToken, checkAuth}
