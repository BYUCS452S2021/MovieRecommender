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

const login = async ({username, password}) => {
  try {
    const results = await dynamo.listTables({}).promise()
    return results.TableNames.join('\n')
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  makeTable,
  login
}
