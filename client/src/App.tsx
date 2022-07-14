import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { getCSRFToken } from './modules/memoryToken';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Success from './pages/Success';
import { RootState } from './redux/store';

const App = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [mmTk, setMmTk] = useState<string>();

  useEffect(() => {
    getCSRFToken().then((data) => setMmTk(data));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/products/:category'} element={<ProductList />} />
        <Route path={'/product/:id'} element={<Product />} />
        <Route path={'/cart'} element={<Cart mmTk={mmTk as string} />} />
        <Route
          path={'/login'}
          element={user ? <Navigate to='/' /> : <Login />}
        />
        <Route
          path={'/register'}
          element={user ? <Navigate to='/' /> : <Register />}
        />
        <Route path={'/success'} element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
