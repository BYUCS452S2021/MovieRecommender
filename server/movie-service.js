const axios = require('axios');

const movieDBKey = process.env.MOVIEDB_KEY

const getTrendingMovie = async () => {
  const page = Math.floor(Math.random() * 500) + 1
  const index = Math.floor(Math.random() * 20) + 1
  const movieResponse = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${movieDBKey}&language=en-US&certification_country=US&certification.lte=PG-13&include_adult=false&include_video=true&page=${page}&release_date.gte=2005-01-01&vote_average.gte=6&with_original_language=en`
  )
  const movie = movieResponse.data.results[index]
  const trailerResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${movieDBKey}&language=en-US`)
  const trailer = trailerResponse.data.results.filter(video => video.site === 'YouTube' && video.type === 'Trailer' && video.key)?.[0]
  return {
    ...movie,
    trailerUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : undefined
  }
}

module.exports = {
  getTrendingMovie
}
