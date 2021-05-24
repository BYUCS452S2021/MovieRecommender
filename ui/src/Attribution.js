import {Img} from '@instructure/ui-img'
import {Text} from '@instructure/ui-text'
import {View} from '@instructure/ui-view'

import TheMovieDBUrl from './Images/TheMovieDB.svg'

const Attribution = () => (
  <View as="div">
    <Img src={TheMovieDBUrl} height="1em" margin="medium 0 x-small" />
    <Text weight="light" as="div">
      Movie data provided by The Movie DB
    </Text>
  </View>
)

export default Attribution
