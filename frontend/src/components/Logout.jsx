import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BiPowerOff } from 'react-icons/bi'
const Logout = () => {
    const navigate = useNavigate()
    const handleClick = async () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div onClick={handleClick} className='logout-section'>
            <BiPowerOff />
        </div>
    )
}

export default Logout