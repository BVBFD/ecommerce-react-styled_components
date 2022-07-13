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
          <Route path={'/'} element={user ? <Home /> : <Login />} />
          <Route path={'/users'} element={user ? <UserList /> : <Login />} />
          <Route path={'/user/:userId'} element={user ? <User /> : <Login />} />
          <Route path={'/newUser'} element={user ? <NewUser /> : <Login />} />
          <Route
            path={'/products'}
            element={user ? <ProductList /> : <Login />}
          />
          <Route
            path={'/product/:productId'}
            element={user ? <Product /> : <Login />}
          />
          <Route
            path={'/newProduct'}
            element={user ? <NewProduct /> : <Login />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
