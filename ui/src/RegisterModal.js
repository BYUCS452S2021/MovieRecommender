import PropTypes from 'prop-types'
import {useState, useContext} from 'react'

import {Modal} from '@instructure/ui-modal'
import {Heading} from '@instructure/ui-heading'
import {FormFieldGroup} from '@instructure/ui-form-field'
import {ScreenReaderContent} from '@instructure/ui-a11y-content'
import {TextInput} from '@instructure/ui-text-input'
import {Button} from '@instructure/ui-buttons'

import {showAlert, doFetch} from './utils'
import UserContext from './userContext'

const RegisterModal = ({open, setOpen}) => {
  const {setUser} = useContext(UserContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [name, setName] = useState('')

  const canSubmit = username && password && name && password === passwordConfirmation

  const resetFields = () => {
    setUsername('')
    setPassword('')
    setPasswordConfirmation('')
    setName('')
  }

  const handleRegister = () => {
    doFetch('/user', 'POST', undefined, {
      username,
      password,
      fullName: name
    })
      .then(response => {
        setUser({
          id: response.id,
          token: response.token,
          name
        })
      })
      .catch(err => {
        showAlert(err.message)
      })
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
      label="Modal: Register"
      shouldCloseOnDocumentClick
      liveRegion={() => document.getElementById('alerts')}
      mountNode={() => document.getElementById('root')}
    >
      <Modal.Header>
        <Heading>Register</Heading>
      </Modal.Header>
      <Modal.Body>
        <FormFieldGroup
          description={
            <ScreenReaderContent>Register Modal</ScreenReaderContent>
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
          <TextInput
            renderLabel="Confirm Password"
            type="password"
            value={passwordConfirmation}
            onChange={(_e, val) => setPasswordConfirmation(val)}
          />
          <TextInput
            renderLabel="Full Name"
            value={name}
            onChange={(_e, val) => setName(val)}
          />
        </FormFieldGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setOpen(false)} margin="0 x-small 0 0">Close</Button>
        <Button
          color="primary"
          onClick={() => handleRegister()}
          interaction={canSubmit ? 'enabled' : 'disabled'}
        >
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

RegisterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}


export default RegisterModal
