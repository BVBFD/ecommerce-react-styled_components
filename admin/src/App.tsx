import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './pages/userList/UserList';

const App = () => {
  console.log(process.env.REACT_APP_ADMIN);

  return (
    <Router>
      <Topbar />
      <div className='container'>
        <Sidebar />
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/users'} element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
