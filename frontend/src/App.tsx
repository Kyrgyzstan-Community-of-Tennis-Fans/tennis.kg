import { Login } from '@/features/users/Login';
import { Register } from '@/features/users/Register';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Partners from '@/features/partners/Partners';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/register'} element={<Register />} />
      <Route path={'/partners'} element={<Partners />} />
    </Routes>
  );
};
