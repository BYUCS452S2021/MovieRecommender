const {query} = require('./connection.js')

const main = async req => {
  try {
    const result = await query('SELECT * FROM "User";')
    return result.rows
  } catch (err) {
    return err
  }
}

const user = req => {
  return 'User Page coming soon.'
}

module.exports = {main, user}
