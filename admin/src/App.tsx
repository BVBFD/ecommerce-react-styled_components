import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';

const App = () => {
  console.log(process.env.REACT_APP_ADMIN);

  return (
    <BrowserRouter>
      <Topbar />
      <div className='container'>
        <Sidebar />
        <Home />
      </div>
    </BrowserRouter>
  );
};

export default App;
