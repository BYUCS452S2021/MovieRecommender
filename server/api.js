const {query, makeError, hash, checkAuth} = require('./utils.js')

const login = async ({username, password}) => {
  if (!username || !password) {
    throw makeError(400, 'Missing data')
  }
  const response = await query('SELECT id, full_name FROM "User" WHERE username = $1', [username])
  await checkAuth(response.rows?.[0]?.id, password)
  return response.rows[0]
}

const createUser = async ({username, password, fullName}) => {
  if (!username || !password || !fullName) {
    throw makeError(400, 'Missing data')
  }

  try {
    await query('INSERT INTO "User" (username, hash, full_name) VALUES ($1, $2, $3)', [username, hash(password), fullName])
    const response = await query('SELECT id, username, full_name FROM "User" WHERE username = $1', [username])
    return response.rows[0]
  } catch (err) {
    throw makeError(500, err.detail)
  }
}

const createPair = async ({userId, password, partnerId}) => {
  await checkAuth(userId, password)
  return ':)'
}

const getPair = async ({userId, password}) => {
  await checkAuth(userId, password)
  return ':)'
}

const getMovie = async ({userId, password}) => {
  await checkAuth(userId, password)
  return ':)'
}

const rateMovie = async ({userId, password, movieId, rating}) => {
  await checkAuth(userId, password)
  return ':)'
}

const getRecommendation = async ({userId, password}) => {
  await checkAuth(userId, password)
  return ':)'
}

module.exports = {
  login,
  createUser,
  createPair,
  getPair,
  getMovie,
  rateMovie,
  getRecommendation
}
