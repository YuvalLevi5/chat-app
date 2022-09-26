import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute, BASE_URL  } from '../utils/ApiRoutes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import { io } from "socket.io-client";


const Chat = () => {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false)
  const socket = useRef();

  useEffect(() => {
    async function check() {
      if (!localStorage.getItem('chat-app-user')) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
        setIsLoaded(true)
      }
    }
    check()
  }, [])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(BASE_URL);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

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


  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }


  return (
    <>
      <section className='chat-page'>
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
          {
            isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer socket={socket} currentChat={currentChat} currentUser={currentUser} />
            )

          }

        </div>
      </section>
    </>
  )
}

export default Chat