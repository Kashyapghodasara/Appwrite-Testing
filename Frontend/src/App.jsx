import { useState } from 'react'
import './App.css'
import Home from './Components/Home'
import { UserProvider } from './lib/context/user.jsx';

function App() {

  return (
    <>
      <UserProvider>
        <Home />
      </UserProvider>
    </>
  )
}

export default App
