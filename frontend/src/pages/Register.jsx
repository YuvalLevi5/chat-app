import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';
const Register = () => {

  const handleSubmit = (event) => {
    event.preventDefault()
    alert("form")
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src="" alt="" />
            <h1>Snappy</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={e=> handleChange(e)}/>
          <input type="email" placeholder='Email' name='email' onChange={e=> handleChange(e)}/>
          <input type="password" placeholder='Password' name='password' onChange={e=> handleChange(e)}/>
          <input type="password" placeholder='Confirm Password' name='confirm-password' onChange={e=> handleChange(e)}/>
          <button type='submit'>Create User</button>
          <span>already have an account? <NavLink to='/login'>Login</NavLink>  </span>
        </form>
      </FormContainer>
    </>
  )
}

const FormContainer = styled.div``

export default Register