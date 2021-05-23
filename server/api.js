const {query, makeError, hash, genToken, checkAuth} = require('./utils.js')

const login = async ({username, password}) => {
  if (!username || !password) {
    throw makeError(400, 'Missing data')
  }

  const response = await query('SELECT id, full_name FROM "User" WHERE username = $1 AND hash = $2', [username, hash(password)])
  const userId = response.rows[0]?.id
  if (!userId) {
    throw makeError(401, 'Unable to authenticate')
  }
  const token = genToken()
  try {
    await query('INSERT INTO "AuthToken" (token, "user", valid) VALUES ($1, $2, $3)', [token, userId, true])
  } catch (err) {
    throw makeError(500, 'Failed creating token')
  }

  return {
    id: userId,
    full_name: response.rows[0].full_name,
    token
  }
}

const createUser = async ({username, password, fullName}) => {
  if (!username || !password || !fullName) {
    throw makeError(400, 'Missing data')
  }

  try {
    await query('INSERT INTO "User" (username, hash, full_name) VALUES ($1, $2, $3)', [username, hash(password), fullName])
  } catch (err) {
    throw makeError(500, err.detail)
  }

  return await login({username, password})
}

const createPair = async ({token, partnerId}) => {
  const userId = await checkAuth(token)

  if (!partnerId) {
    throw makeError(400, 'Missing partner ID')
  }

  if (partnerId === userId) {
    throw makeError(400, 'You cannot pair with yourself')
  }

  const currentPartner = await getPair({token})
  if (currentPartner?.username) {
    throw makeError(400, 'You already have a partner')
  }

  const partnersPartner = await query('SELECT * FROM "Pair" WHERE user_a = $1 OR user_b = $1', [partnerId])
  if (partnersPartner.rows.length > 0) {
    throw makeError(400, 'This user already has a partner')
  }

  await query('INSERT INTO "Pair" (user_a, user_b) VALUES ($1, $2)', [userId, partnerId])
  return await getPair({token})
}

const getPair = async ({token}) => {
  const userId = await checkAuth(token)
  const pair = await query('SELECT user_a, user_b FROM "Pair" WHERE user_a = $1 OR user_b = $1', [userId])
  if (pair.rows.length === 0 || !pair.rows[0].user_a || !pair.rows[0].user_b) {
    return {}
  }
  const partnerId = pair.rows[0].user_a === userId ? pair.rows[0].user_b : pair.rows[0].user_a
  const response = await query('SELECT full_name, username FROM "User" WHERE id = $1', [partnerId])
  return response.rows[0]
}

const getMovie = async ({token}) => {
  const userId = await checkAuth(token)
  return ':)'
}

const rateMovie = async ({token, movieId, rating}) => {
  const userId = await checkAuth(token)
  return ':)'
}

const getRecommendation = async ({token}) => {
  const userId = await checkAuth(token)
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
