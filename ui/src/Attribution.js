import {Img} from '@instructure/ui-img'
import {Text} from '@instructure/ui-text'
import {View} from '@instructure/ui-view'

import TheMovieDBUrl from './Images/TheMovieDB.svg'

const Attribution = () => (
  <View as="div">
    <Img src={TheMovieDBUrl} height="1em" margin="medium 0 x-small" />
    <Text weight="light" as="div" size="small">
      Movie data provided by TMDb. This product uses the TMDb API but is not endorsed or certified by TMDb.
    </Text>
  </View>
)

export default Attribution
