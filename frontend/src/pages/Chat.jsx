import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute } from '../utils/ApiRoutes'

const Chat = () => {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(async () => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
    }
  }, [])

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
        setContacts(data.data)
      } else {
        navigate('/setAvatar')
      }
    }
  }, [currentUser])


  return (
    <>
      <section className='chat-page'>
        <div className="container">

        </div>
      </section>
    </>
  )
}

export default Chat