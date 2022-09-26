import React, { useState, useEffect } from 'react'
import Logo from '../assets/logo.svg'
const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function setUserData() {
      if (currentUser) {
        setCurrentUserImage(currentUser.avatarImage)
        setCurrentUserName(currentUser.username)
      }
    }
    setUserData()
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
    closeNav()
  }


  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  return (
    <>
      {currentUserImage && currentUserImage && (
        <>
          <section id="mySidenav" className='contacts-section'>
            <a className="closebtn" onClick={closeNav}>&times;</a>
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h3>snappy</h3>
            </div>
            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`contact ${index === currentSelected ? "selected" : ""
                      }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="current-user">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </section>
          <span onClick={openNav} className="open-btn">
            <div>
              <div className='line'></div>
              <div className='line'></div>
              <div className='line'></div>
            </div>
          </span>
        </>
      )}
    </>
  );


}

export default Contacts