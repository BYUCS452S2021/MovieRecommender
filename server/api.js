const {query, makeError} = require('./utils.js')

const createUser = async ({username, password, fullName}) => {
  if (!username || !password || !fullName) {
    throw makeError(400, 'Missing data')
  }

  try {
    await query('INSERT INTO "User" (username, hash, full_name) VALUES ($1, $2, $3)', [username, password, fullName])
    const response = await query('SELECT id, username, full_name FROM "User" WHERE username = $1', [username])
    return response.rows[0]
  } catch (err) {
    throw makeError(500, err.detail)
  }
}

const createPair = ({userId, password, partnerId}) => {
  return ':)'
}

const getPair = ({userId, password}) => {
  return ':)'
}

const getMovie = ({userId, password}) => {
  return ':)'
}

const rateMovie = ({userId, password, movieId, rating}) => {
  return ':)'
}

const getRecommendation = ({userId, password}) => {
  return ':)'
}

module.exports = {
  createUser,
  createPair,
  getPair,
  getMovie,
  rateMovie,
  getRecommendation
}
