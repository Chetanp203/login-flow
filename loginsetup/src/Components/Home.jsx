import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const{state,dispatch}=useContext(AuthContext);
    const router = useNavigate();
    
  return (
    <div>
        <h1>Home</h1>
        <h2>Hello:{state?.user?.name}</h2>
        <h2>Hello:{state?.user?.number}</h2>
        {state?.user &&
        <button onClick={()=>dispatch({type:"LOGOUT"})}>Logout</button>}
        {!state?.user &&
        <button onClick={()=>router('/login')}>Login</button>}
    </div>
  )
}

export default Home