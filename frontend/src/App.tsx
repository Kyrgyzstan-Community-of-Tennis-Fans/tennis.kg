import { Toaster } from '@/components/ui/sonner';
import Partners from '@/features/partners/Partners';
import { ForgotPassword } from '@/features/users/ForgotPassword';
import { Login } from '@/features/users/Login';
import { Register } from '@/features/users/Register';
import { ResetPassword } from '@/features/users/ResetPassword';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Partners from '@/features/partners/Partners';
import News from '@/features/news/News';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/register'} element={<Register />} />
      <Route path={'/partners'} element={<Partners />} />
      <Route path={'/news'} element={<News />} />
    </Routes>

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/reset-password/:token'} element={<ResetPassword />} />
        <Route path={'/forgot-password'} element={<ForgotPassword />} />
        <Route path={'/partners'} element={<Partners />} />
      </Routes>
      <Toaster />
    </>
  );
};
