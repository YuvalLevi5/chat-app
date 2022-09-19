import React from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import SetAvatar from './components/SetAvatar';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="" element={<Chat />} />
        </Routes>
      </div>
      {/* <NavLink to="/register">Bla</NavLink>
      <NavLink to="/login">Bla</NavLink> */}
    </Router>
  )
}

export default App