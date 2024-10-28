import { Toaster } from '@/components/ui/sonner';
import { ForgotPassword } from '@/features/users/ForgotPassword';
import { ResetPassword } from '@/features/users/ResetPassword';
import { Login } from '@/features/users/Login';
import { Register } from '@/features/users/Register';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/reset-password/:token'} element={<ResetPassword />} />
        <Route path={'/forgot-password'} element={<ForgotPassword />} />
      </Routes>
      <Toaster />
    </>
  );
};
