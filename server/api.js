const {query, makeError, hash, genToken, checkAuth} = require('./utils.js')
const movieService = require('./movie-service.js')

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

const logout = async ({token}) => {
  const userId = await checkAuth(token)
  try {
    await query('UPDATE "AuthToken" SET valid = $1 WHERE "user" = $2', [false, userId])
    return {status: 'ok'}
  } catch (err) {
    throw makeError('Logout failed')
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

const createPair = async ({token, partnerUsername}) => {
  const userId = await checkAuth(token)

  if (!partnerUsername) {
    throw makeError(400, 'Missing partner username')
  }

  const partnerIdRequest = await query('SELECT id FROM "User" WHERE username = $1', [partnerUsername])
  const partnerId = partnerIdRequest.rows[0]?.id
  if (!partnerId) {
    throw makeError(400, 'Not a valid username')
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
  await checkAuth(token)

  // If the user's partner has some +1s or +2s, show those first
  // TODO: Fetch a movie that the partner has +1'd or +2'd to rate first, if available

  // Otherwise, get some trending movies from the Movie DB API
  // TODO: Make this part not return movies that the user has already rated or that the partner has -1'd
  try {
    const movie = await movieService.getTrendingMovie()
    const result = await query(
      'INSERT INTO "Movie" (title, api_id, overview, release_date, trailer_url) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [movie.original_title, movie.id, movie.overview, movie.release_date, movie.trailerUrl]
    )
    return {
      id: result.rows[0].id,
      apiId: movie.id,
      title: movie.title,
      overview: movie.overview,
      releaseDate: movie.release_date,
      trailerUrl: movie.trailerUrl
    }
  } catch (err) {
    throw makeError(500, 'Error getting movie')
  }
}

const rateMovie = async ({token, movieId, rating}) => {
  const userId = await checkAuth(token)
  const validRatings = [-1, 1, 2]
  if (!movieId || !rating || !validRatings.includes(rating)) {
    throw makeError(400, 'Missing information')
  }

  try {
    await query('INSERT INTO "Preference" ("user", movie, rating) VALUES ($1, $2, $3)', [userId, movieId, rating])
    return {
      status: 'ok'
    }
  } catch (err) {
    throw makeError(500, 'Error saving preference')
  }
}

const getRecommendation = async ({token}) => {
  const userId = await checkAuth(token)

  // TODO: This needs to return a limited list of movies that both partners have +1'd or +2'd (or an empty array)
  const movie = await getMovie({token})
  return [movie, movie]
}

module.exports = {
  login,
  logout,
  createUser,
  createPair,
  getPair,
  getMovie,
  rateMovie,
  getRecommendation
}
