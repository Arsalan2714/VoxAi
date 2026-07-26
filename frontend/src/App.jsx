import React, { useEffect } from 'react'
import { auth, googleProvider } from '../utils/firebase.js'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import api from '../utils/axios.js'
import Home from './pages/Home.jsx'
import getCurrentUser from './features/getCurrentUser.js'
import { setUserData } from './redux/userSlice.js'
import { useDispatch } from 'react-redux'


function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    const getUser = async() => {
     const data = await getCurrentUser()
     dispatch(setUserData(data))
    }
    getUser()
  },[])


  return (
   <>
   <Home/>
   </>
  )
}

export default App