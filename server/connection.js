const {Client} = require('pg')

const query = q => {
  const client = new Client({
    host: 'localhost',
    database: 'MovieRecommender',
    port: 5432
  })
  client.connect()
  return client.query(q).finally(() => client.end())
}

module.exports = {query}
