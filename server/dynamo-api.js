const AWS = require('aws-sdk')
const {makeError, hash, genToken} = require('./utils.js')
const movieService = require('./movie-service.js')

const dynamo = new AWS.DynamoDB({
  endpoint: new AWS.Endpoint('http://localhost:8000'),
  region: 'local'
})

const login = async ({username, password}) => {
  dynamo.listTables({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      return data.TableNames
    }
  })
}

module.exports = {
  login
}
