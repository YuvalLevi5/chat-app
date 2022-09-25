import React from 'react'
import Logout from './Logout'

const ChatContainer = ({ currentChat }) => {
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
            <div className='chat-input'></div>
          </section >
        )
      }
    </>
  )
}

export default ChatContainer