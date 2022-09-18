import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, NavLink } from 'react-router-dom';
import Logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { registerRoute } from '../utils/ApiRoutes';


const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (handleValidation()) {
      const { password, confirmPassword, username, email } = values
      const {data} = await axios.post(registerRoute, {
        username,email, password, confirmPassword
      })

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem(
          'chat-app-user',
          JSON.stringify(data.user)
        );
        navigate("/");
      }

    }
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values
    console.log(password)
    console.log(confirmPassword)
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be the same", toastOptions)
      return false
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions)
      return false
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters", toastOptions)
      return false
    } else if (email === "") {
      toast.error("Email is required", toastOptions)
      return false
    }

    return true 
    
  }

  return (
    <>

      <section className='form-container'>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>Snappy</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={(event) => handleChange(event)} />
          <input type="email" placeholder='Email' name='email' onChange={(event) => handleChange(event)} />
          <input type="password" placeholder='Password' name='password' onChange={(event) => handleChange(event)} />
          <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(event) => handleChange(event)} />
          <button type='submit'>Create User</button>
          <span>Already have an account? <NavLink to='/login'>Login</NavLink>  </span>
        </form>
      </section>
      <ToastContainer />
    </>
  )
}



export default Register