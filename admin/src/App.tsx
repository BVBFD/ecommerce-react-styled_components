import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/newProduct';
import Login from './pages/login/Login';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const App = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const admin = useSelector(
    (state: RootState) => state.user.currentUser?.isAdmin
  );
  console.log(process.env.REACT_APP_ADMIN);

  return (
    <Router>
      <Topbar />
      <div className='container'>
        <Sidebar />
        <Routes>
          <Route path={'/login'} element={!user ? <Login /> : <Home />} />
          <Route path={'/'} element={admin ? <Home /> : <Login />} />
          <Route path={'/users'} element={admin ? <UserList /> : <Login />} />
          <Route
            path={'/user/:userId'}
            element={admin ? <User /> : <Login />}
          />
          <Route path={'/newUser'} element={admin ? <NewUser /> : <Login />} />
          <Route
            path={'/products'}
            element={admin ? <ProductList /> : <Login />}
          />
          <Route
            path={'/product/:productId'}
            element={admin ? <Product /> : <Login />}
          />
          <Route
            path={'/newProduct'}
            element={admin ? <NewProduct /> : <Login />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
