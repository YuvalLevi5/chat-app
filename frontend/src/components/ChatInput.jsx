import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

const ChatInput = ({handleSendMsg}) => {
    const [msg, setMsg] = useState("");

    const sendChat = (event) => {
        event.preventDefault()
        if (msg.length > 0) {
            handleSendMsg(msg)
            setMsg('')
        } 
    }

    return (
        <section className="chat-input">
            <form className="input-container" onSubmit={(event) => sendChat(event)}>
                <input
                    type="text"
                    placeholder="type your message here..."
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <button type="submit">
                    <IoMdSend />
                </button>
            </form>
        </section>
    )
}

export default ChatInput