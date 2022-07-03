import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Pay from './pages/Pay';
import Success from './pages/Success';

const App = () => {
  return (
    <Routes>
      <Route path={'/pay'} element={<Pay />} />
      <Route path={'/success'} element={<Success />} />
    </Routes>
  );
};

export default App;
