import {useState} from 'react'

import SignInPrompt from './SignInPrompt'
import UserContext from './userContext'

const App = () => {
  const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={{user, setUser}}>
      {user.id ? <p>Signed in as {user.name}</p> : <SignInPrompt />}
    </UserContext.Provider>
  )
}

export default App
