import {useState, useContext, useEffect} from 'react'

import {Byline} from '@instructure/ui-byline'
import {View} from '@instructure/ui-view'
import {Avatar} from '@instructure/ui-avatar'
import {Text} from '@instructure/ui-text'
import {TextInput} from '@instructure/ui-text-input'
import {Button} from '@instructure/ui-buttons'
import {IconGroupLine} from '@instructure/ui-icons'
import {Spinner} from '@instructure/ui-spinner'

import UserContext from './userContext'
import {showAlert, doFetch} from './utils'

const Settings = () => {
  const {user} = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [partnerName, setPartnerName] = useState(null)
  const [partnerUsername, setPartnerUsername] = useState(null)
  const [input, setInput] = useState(null)

  const addPartner = () => {

  }

  useEffect(() => {
    setLoading(true)
    doFetch('/pair', 'GET', user.token)
      .then(partner => {
        setPartnerUsername(partner.username)
        setPartnerName(partner.full_name)
      })
      .catch(err => showAlert(err.message))
      .finally(() => setLoading(false))
  }, [user])

  if (loading) {
    return (
      <View as="div" margin="medium" textAlign="center">
        <Spinner renderTitle="Loading partner information" />
      </View>
    )
  } else if (partnerUsername) {
    return (
      <Byline description={`${partnerName} (${partnerUsername})`}>
        <Avatar name={partnerName} />
      </Byline>
    )
  } else {
    return (
        <>
          <Text>
            You aren't connected with a partner yet. Type in their username below to pair with someone.
          </Text>
          <View as="div" margin="medium 0">
            <TextInput
              renderLabel="Partner Username"
              value={input} onChange={(_e, val) => setInput(val)}
            />
            <Button
              color="primary"
              renderIcon={IconGroupLine}
              onClick={() => addPartner()}
              margin="small 0"
            >
              Pair
            </Button>
          </View>
        </>
      )
  }
}

export default Settings
