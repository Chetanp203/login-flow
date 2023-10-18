import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../Context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
    const [userData,setUserData]= useState({ number:"", password:""})
    const {state,dispatch} = useContext(AuthContext);
    const router = useNavigate();


    const handleChange = (event)=>{
        setUserData({...userData,[event.target.name]:event.target.value})
    }
    // console.log(userData,"-userdata")

    const handleSubmit =async(event)=>{
      event.preventDefault();
      if(userData.number && userData.password){
          try {
              const response = await axios.post('http://localhost:8000/login',{userData})
              if(response.data.success){
                  dispatch({
                      type:'LOGIN',
                      payload:response?.data?.user
                  })
                  localStorage.setItem("token",JSON.stringify(response.data.token));
                  setUserData({number:"",password:""});
                  router('/')
                  toast.success(response.data.message)
              }else{
                  toast.error(response.data.message)
              }
          } catch (error) {
              console.log(error)
          }
      }else{
          toast.error("all fields are mandatory")
      }
  }


  return (
    <div>
        <h1>Login</h1>
        <hr />
        <form onSubmit={handleSubmit}>
            <label>Phone Number:</label><br />
            <input type="number" name='number' value={userData.number} onChange={handleChange} /><br />
            <label>Password:</label><br />
            <input type="password" name='password' value={userData.password} onChange={handleChange}/><br />
            <br />
            <input type="submit" value="Login" /><br />
            <br />
            <span>Dont have an account?<span onClick={()=>router("/register")} style={{color:'yellow',cursor:'pointer'}}><b>Register Here!!</b></span></span>
            
        </form>
    </div>
  )
}

export default Login