import React, { useEffect, useState, useRef } from 'react'
import ChatInput from './ChatInput'
import Logout from './Logout'
import axios from 'axios'
import { v4 as uuidv4 } from "uuid";
import { getAllMessageRoute, sendMessageRoute } from '../utils/ApiRoutes'

const ChatContainer = ({ currentChat, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {

    async function getCurrentChat() {
      const response = await axios.post(getAllMessageRoute, {
        from: currentUser._id,
        to: currentChat._id
      })
      setMessages(response.data);
    }
    getCurrentChat()

  }, [currentChat])

  console.log(currentUser)

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
            <div className='chat-messages'>
              {messages.map((message) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div
                      className={`message ${message.fromSelf ? "sended" : "recieved"
                        }`}
                    >
                      <div className="content ">
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
          </section >
        )
      }
    </>
  )
}

export default ChatContainer