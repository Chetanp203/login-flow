import './App.css'
import { Route,Routes } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Home from './Components/Home'
import Google from './Components/google'
import {gapi} from 'gapi-script'
import { useEffect } from 'react'

function App() {
  const clientId="770991335968-aau5uhjps9kfuqcn0pirv0ld7412htbd.apps.googleusercontent.com"

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:clientId,
        scope:""
      })
    }
    gapi.load('client:auth2',start)
  })

  return (
    <>
     <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/google' element={<Google/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/login' element={<Login/>}/>
     </Routes>
    </>
  )
}

export default App
