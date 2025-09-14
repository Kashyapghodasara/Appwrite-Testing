import { useState } from 'react'
import './App.css'
import Home from './Components/Home'
import { UserProvider } from './lib/context/user.jsx';
import { ProfileProvider } from './lib/context/profile.jsx';

function App() {

  return (
    <>
      <ProfileProvider>
        <UserProvider>
          <Home />
        </UserProvider>
      </ProfileProvider>
    </>
  )
}

export default App
