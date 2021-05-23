import {useState} from 'react'

import {Flex} from '@instructure/ui-flex'
import {Heading} from '@instructure/ui-heading'
import {Text} from '@instructure/ui-text'
import {Button} from '@instructure/ui-buttons'
import {Img} from '@instructure/ui-img'

import ClapperboardUrl from './Images/Clapperboard.svg'
import SignInModal from './SignInModal'
import RegisterModal from './RegisterModal'

const SignInPrompt = () => {
  const [signInModalOpen, setSignInModalOpen] = useState(false)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)

  return (
    <>
      <Flex direction="column" margin="x-large" alignItems="center">
        <Flex.Item margin="medium">
          <Img src={ClapperboardUrl} height="14em" />
        </Flex.Item>
        <Flex.Item>
          <Heading as="h1">Welcome to Movie Recommender</Heading>
        </Flex.Item>
        <Flex.Item margin="x-small small small" textAlign="center">
          <Text color="secondary">
            Movie Recommender helps pairs of people find movies they'd both like to watch.<br />You're not signed in yet. Click to sign in or register.
          </Text>
        </Flex.Item>
        <Flex.Item>
          <Button
            color="primary"
            margin="x-small"
            onClick={() => setSignInModalOpen(true)}
          >
            Sign In
          </Button>
          <Button
            color="secondary"
            margin="x-small"
            onClick={() => setRegisterModalOpen(true)}
          >
            Register
          </Button>
        </Flex.Item>
      </Flex>
      <SignInModal open={signInModalOpen} setOpen={setSignInModalOpen} />
      <RegisterModal open={registerModalOpen} setOpen={setRegisterModalOpen} />
    </>
  )
}

export default SignInPrompt
