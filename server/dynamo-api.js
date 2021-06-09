const AWS = require('aws-sdk')
const {makeError, hash, genToken} = require('./utils.js')
const movieService = require('./movie-service.js')

const dynamo = new AWS.DynamoDB({
  endpoint: new AWS.Endpoint('http://localhost:8000'),
  region: 'local'
})

// Used in the dynamo_init script
const makeTable = async params => {
  try {
    const results = await dynamo.createTable(params).promise()
    console.log(`Created table ${results.TableDescription.TableName}`)
  } catch (err) {
    console.error(err)
  }
}

// Call this before any method requiring authentication
// If credentials are invalid, the function will throw
const checkAuth = async token => {
  if (!token) {
    throw makeError(401, 'Missing token')
  }

  try {
    const results = await dynamo.getItem({
      TableName: 'AuthToken',
      Key: {
        'token': {S: token}
      }
    }).promise()
    if (results.Item.username.S && results.Item.valid.BOOL) {
      return results.Item.username.S
    }
  } catch (err) {
    console.error(err)
    throw makeError(401, 'Could not authenticate')
  }
}

const login = async ({username, password}) => {
  if (!username || !password) {
    throw makeError(400, 'Missing data')
  }

  try {
    const results = await dynamo.getItem({
      TableName: 'User',
      Key: {
        'username': {S: username}
      }
    }).promise()
    if (results.Item.hash.S !== hash(password)) {
      throw makeError(401, 'Unable to authenticate')
    }
    const token = genToken()
    await dynamo.putItem({
      TableName: 'AuthToken',
      Item: {
        'token' : {S: token},
        'username' : {S: username},
        'valid': {BOOL: true}
      }
    }).promise()
    return {
      id: username,
      full_name: results.Item.full_name.S,
      token
    }
  } catch (err) {
    console.error(err)
    throw makeError(500, 'Unable to login')
  }
}

const logout = async ({token}) => {
  await checkAuth(token)
  try {
    await dynamo.putItem({
      TableName: 'AuthToken',
      Item: {
        'token' : {S: token},
        'valid' : {BOOL: false}
      }
    }).promise()
    return {status: 'ok'}
  } catch (err) {
    console.error(err)
    throw makeError(500, 'Logout failed')
  }
}

const createUser = async ({username, password, fullName}) => {
  if (!username || !password || !fullName) {
    throw makeError(400, 'Missing data')
  }

  try {
    await dynamo.putItem({
      TableName: 'User',
      Item: {
        'username' : {S: username},
        'hash' : {S: hash(password)},
        'full_name' : {S: fullName}
      }
    }).promise()
  } catch (err) {
    console.error(err)
    throw makeError(500, 'Could not create user')
  }

  return await login({username, password})
}

module.exports = {
  makeTable,
  login,
  logout,
  createUser
}
