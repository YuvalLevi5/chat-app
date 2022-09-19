import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import Loader from '../assets/loader.gif'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Buffer } from "buffer";
import { setAvatarRoute } from '../utils/ApiRoutes';

const SetAvatar = () => {
    const api = 'https://api.multiavatar.com/45678945'
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    const setProfilePicture = async () => {
        useEffect(async () => {
            const data = []
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
            }
            const buffer = new Buffer(image.data)
            data.push(buffer.toString("base64"));
            setAvatars(data);
            setIsLoading(false);
        }, [])
    }

    return (
        <>
            <section>
                <div className="title">
                    <h1>Pick an avatar as your profile picture</h1>
                </div>
                <div className="avatars">
                    {
                        avatars.map((avatar, idx) => {
                            return (
                                <div className={`avatar ${selectedAvatar === idx ? "selecred" : ""}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" key={avatar}  onClick={() => setSelectedAvatar(idx)} />
                                </div>
                            )
                        })

                    }
                </div>
            </section>
            <ToastContainer />
        </>

    )
}

export default SetAvatar