import {useState, useContext} from 'react'

import {Flex} from '@instructure/ui-flex'
import {Heading} from '@instructure/ui-heading'
import {Tabs} from '@instructure/ui-tabs'
import {Text} from '@instructure/ui-text'
import {
  IconVideoLine,
  IconStarLightLine,
  IconSettingsLine,
  IconUserLine
} from '@instructure/ui-icons'
import {Button} from '@instructure/ui-buttons'

import UserContext from './userContext'
import Recommendations from './Recommendations'
import RateMovies from './RateMovies'
import Settings from './Settings'
import { doFetch, showAlert } from "./utils";

const MainView = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const {user, setUser} = useContext(UserContext)

  const logOut = () => {
    doFetch('/logout', 'GET', user.token)
      .then(() => showAlert('Logged Out', 'info'))
      .catch(err => showAlert(err))
      .finally(() => setUser({}))
  }

  return (
    <Flex direction="column" margin="x-large">
      <Flex justifyItems="space-between">
        <Heading level="h1">Welcome, {user.name}!</Heading>
        <Button
          withBackground={false}
          renderIcon={IconUserLine}
          onClick={() => logOut()}
        >
          Log Out
        </Button>
      </Flex>
      <Tabs
        margin="large 0"
        onRequestTabChange={(_e, {index}) => setSelectedTab(index)}
        tabOverflow="scroll"
      >
        <Tabs.Panel
          id="tab-0"
          renderTitle={<Text><IconVideoLine /> Recommendations</Text>}
          padding="medium 0"
          isSelected={selectedTab === 0}
        >
          <Recommendations />
        </Tabs.Panel>
        <Tabs.Panel
          id="tab-1"
          renderTitle={<Text><IconStarLightLine /> Rate Movies</Text>}
          padding="medium 0"
          isSelected={selectedTab === 1}
        >
          <RateMovies />
        </Tabs.Panel>
        <Tabs.Panel
          id="tab-2"
          renderTitle={<Text><IconSettingsLine /> Settings</Text>}
          padding="medium 0"
          isSelected={selectedTab === 2}
        >
          <Settings />
        </Tabs.Panel>
      </Tabs>
    </Flex>
  )
}

export default MainView
