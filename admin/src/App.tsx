import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/newProduct';
import Login from './pages/login/Login';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { getCSRFToken } from './module/memoryToken';

const App = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const admin = useSelector(
    (state: RootState) => state.user.currentUser?.isAdmin
  );
  const [mmTk, setMmTk] = useState<string>();

  useEffect(() => {
    getCSRFToken().then((data) => setMmTk(data));
  }, []);

  return (
    <Router>
      <Topbar />
      <div className='container'>
        <Sidebar />
        <Routes>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/'} element={user ? <Home /> : <Login />} />
          <Route
            path={'/users'}
            element={user ? <UserList mmTk={mmTk as string} /> : <Login />}
          />
          <Route
            path={'/user/:userId'}
            element={user ? <User mmTk={mmTk as string} /> : <Login />}
          />
          <Route
            path={'/newUser'}
            element={user ? <NewUser mmTk={mmTk as string} /> : <Login />}
          />
          <Route
            path={'/products'}
            element={user ? <ProductList mmTk={mmTk as string} /> : <Login />}
          />
          <Route
            path={'/product/:productId'}
            element={user ? <Product mmTk={mmTk as string} /> : <Login />}
          />
          <Route
            path={'/newProduct'}
            element={user ? <NewProduct mmTk={mmTk as string} /> : <Login />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
