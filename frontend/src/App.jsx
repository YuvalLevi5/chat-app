import React from 'react'
import { HashRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route excat path='' element={<Chat />} />
          <Route excat path='/login' element={<Login />} />
          <Route excat path='/register' element={<Register />} />
        </Routes>
      </div>
      <NavLink to="/register">Bla</NavLink>
    </Router>
  )
}

export default App