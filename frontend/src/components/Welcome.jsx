import React from 'react'
import Robot from '../assets/robot.gif'

const Welcome = ({ currentUser }) => {
    return (
        <section className='welcome-section'>
            <img src={Robot} alt="robot" />
            <h1>Welcome <span>{currentUser.username}</span></h1>
            <h3>Please select a chat to start messaging</h3>
        </section>
    )
}

export default Welcome