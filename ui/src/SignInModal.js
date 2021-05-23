import PropTypes from 'prop-types'
import {useState, useContext} from 'react'

import {Modal} from '@instructure/ui-modal'
import {Heading} from '@instructure/ui-heading'
import {Button} from '@instructure/ui-buttons'
import {TextInput} from '@instructure/ui-text-input'
import {FormFieldGroup} from '@instructure/ui-form-field'
import {ScreenReaderContent} from '@instructure/ui-a11y-content'

import {showAlert, doFetch} from './utils'
import UserContext from './userContext'

const SignInModal = ({open, setOpen}) => {
  const {setUser} = useContext(UserContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const canSubmit = username && password

  const resetFields = () => {
    setUsername('')
    setPassword('')
  }

  const handleSignIn = () => {
    doFetch('/login', 'POST', undefined, {
      username,
      password
    })
      .then(response => {
        setUser({
          id: response.id,
          token: response.token,
          name: response.full_name
        })
      })
      .catch(err => showAlert(err.message))
      .finally(() => {
        resetFields()
        setOpen(false)
      })
  }

  return (
    <Modal
      open={open}
      onDismiss={() => setOpen(false)}
      size="small"
      label="Modal: Sign In"
      shouldCloseOnDocumentClick
      liveRegion={() => document.getElementById('alerts')}
      mountNode={() => document.getElementById('root')}
    >
      <Modal.Header>
        <Heading>Sign In</Heading>
      </Modal.Header>
      <Modal.Body>
        <FormFieldGroup
          description={
            <ScreenReaderContent>Sign In Modal</ScreenReaderContent>
          }
          layout="stacked"
        >
          <TextInput
            renderLabel="Username"
            value={username}
            onChange={(_e, val) => setUsername(val)}
          />
          <TextInput
            renderLabel="Password"
            type="password"
            value={password}
            onChange={(_e, val) => setPassword(val)}
          />
        </FormFieldGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setOpen(false)} margin="0 x-small 0 0">Close</Button>
        <Button
          color="primary"
          onClick={() => handleSignIn()}
          interaction={canSubmit ? 'enabled' : 'disabled'}
        >
          Sign In
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

SignInModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}

export default SignInModal
