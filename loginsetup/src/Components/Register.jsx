import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios'

const Register = () => {
    const [userData,setUserData]= useState({name:"", number:"", password:""})
    const router = useNavigate();

    const handleChange = (event)=>{
        setUserData({...userData,[event.target.name]:event.target.value})
    }
    console.log(userData,"-userdata")

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(userData.name && userData.number && userData.password){
          
            try {
              const response = await axios.post("http://localhost:8000/register",{userData});
              if(response.data.success){
                setUserData({name:"", number:"", password:""})
                // router("/login")
                toast.success(response.data.message)
              }else{
                toast.error(response.data.message)
              }
            } catch (error) {
              toast.error(error.response.data.message)
            }
        }else{
            toast.error("All fields are mandatory")
        }
    }

  return (
    <div>
        <form  onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <hr />
            <label>Name:</label><br />
            <input type="text" placeholder='Username' name='name' onChange={handleChange} value={userData.name} /><br />
            <label>Number:</label><br />
            <input type="number" placeholder='Phone Number' name='number' onChange={handleChange} value={userData.number} /><br />
           <label>Password:</label><br />
            <input type="password" placeholder='Password' name='password' onChange={handleChange} value={userData.password}/><br />
            <br />
            <input className='sub' type="submit" value="Register"/>
            <br />
            <span>Already have an account?<span onClick={()=>router("/login")} style={{color:'yellow',cursor:'pointer'}}><b>Login Here!!</b></span></span>
        </form>
    </div>
  )
}

export default Register