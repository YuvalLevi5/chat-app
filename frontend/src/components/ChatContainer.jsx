import React from 'react'
import ChatInput from './ChatInput'
import Logout from './Logout'
import axios from 'axios'
import { sendMessageRoute } from '../utils/ApiRoutes'

const ChatContainer = ({ currentChat, currentUser }) => {
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    })
  }

  return (
    <>
      {
        currentChat && (
          <section className='chat-container'>
            <div className='chat-header'>
              <div className='user-details'>
                <div className='avatar'>
                  <img
                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                    alt='avatar'
                  />
                </div>
                <div className='username'>
                  <h3>{currentChat.username}</h3>
                </div>
              </div>
              <Logout />
            </div>
            <div className='chat-messages'></div>
            <ChatInput handleSendMsg={handleSendMsg} />
          </section >
        )
      }
    </>
  )
}

export default ChatContainer