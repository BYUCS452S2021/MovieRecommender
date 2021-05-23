import {useState} from 'react'

import SignInPrompt from './SignInPrompt'
import UserContext from './userContext'
import MainView from './MainView'

const App = () => {
  const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={{user, setUser}}>
      {user.id ? <MainView /> : <SignInPrompt />}
    </UserContext.Provider>
  )
}

export default App
