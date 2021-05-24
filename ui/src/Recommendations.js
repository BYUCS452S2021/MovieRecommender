import {useState, useContext, useEffect} from 'react'
import PropTypes from 'prop-types'

import {Spinner} from '@instructure/ui-spinner'
import {View} from '@instructure/ui-view'
import {Text} from '@instructure/ui-text'
import {Button} from '@instructure/ui-buttons'
import {Heading} from '@instructure/ui-heading'

import {showAlert, doFetch} from './utils'
import UserContext from './userContext'
import Separator from './Separator'

const Recommendations = () => {
  const {user} = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState(null)

  const fetchRecommendations = () => {
    setLoading(true)
    doFetch('/recommendation', 'GET', user.token)
      .then(setRecommendations)
      .catch(err => showAlert(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchRecommendations()
    // Only load the recommendations on first render since we'll request more on-demand
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token])

  const Recommendation = ({movie}) => (
    <View as="div" margin="medium 0">
      <Heading level="h3" margin="small 0">{movie.title}</Heading>
      <Text as="div">{movie.overview}</Text>
      <View as="div" margin="small 0 medium">
        <Text weight="light">{movie.releaseDate}</Text>
      </View>
      <Separator />
    </View>
  )

  Recommendation.propTypes = {
    movie: PropTypes.object.isRequired
  }

  return loading ? (
    <View as="div" margin="medium" textAlign="center">
      <Spinner renderTitle="Loading recommendations" />
    </View>
  ) : recommendations?.length === 0 ? (
    <Text as="div">
      No recommendations yet. Head over to the <b>Rate Movies</b> tab to make some ratings.
    </Text>
  ) : recommendations?.length > 0 ? (
    <>
      <Text as="div" color="secondary">
        These are movies that you and your partner have both liked. Hope you enjoy!
      </Text>
      <View margin="small 0">
        {recommendations.map(r => <Recommendation movie={r} />)}
      </View>
    </>
  ) : (
    <Button color="primary" margin="large 0" onClick={() =>fetchRecommendations()}>
      Load Recommendations
    </Button>
  )
}

export default Recommendations
