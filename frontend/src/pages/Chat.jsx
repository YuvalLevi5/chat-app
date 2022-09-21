import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute } from '../utils/ApiRoutes'
import Contacts from '../components/Contacts'

const Chat = () => {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    async function check() {
      if (!localStorage.getItem('chat-app-user')) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
      }
    }
    check()
  }, [])


  useEffect(() => {
    async function checkUser() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data)
        } else {
          navigate('/setAvatar')
        }
      }
    }
    checkUser()
  }, [currentUser])


  return (
    <>
      <section className='chat-page'>
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} />
        </div>
      </section>
    </>
  )
}

export default Chat