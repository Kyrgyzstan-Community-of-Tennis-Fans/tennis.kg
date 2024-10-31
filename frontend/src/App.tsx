import { useAppSelector } from '@/app/hooks';
import { Error404 } from '@/components/Errors/Error404';
import { Layout } from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRouter/ProtectedRouter';
import { Toaster } from '@/components/ui/sonner';
import { Category } from '@/features/category/category';
import Partners from '@/features/partners/Partners';
import { ForgotPassword } from '@/features/users/ForgotPassword';
import { Login } from '@/features/users/Login';
import { Register } from '@/features/users/Register';
import { ResetPassword } from '@/features/users/ResetPassword';
import { selectUser } from '@/features/users/usersSlice';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import News from '@/features/news/News';
import AdminPartners from '@/features/partners/AdminPartners';

export const App: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <Layout>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/reset-password/:token'} element={<ResetPassword />} />
        <Route path={'/forgot-password'} element={<ForgotPassword />} />
        <Route path={'/news'} element={<News />} />
        <Route
          path={'/partners'}
          element={
            <ProtectedRoute isAllowed={user && user.role === 'admin'}>
              <Partners />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/category'}
          element={
            <ProtectedRoute isAllowed={user && user.role === 'admin'}>
              <Category />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/admin-partners'}
          element={
            <ProtectedRoute isAllowed={user && user.role === 'admin'}>
              <AdminPartners />
            </ProtectedRoute>
          }
        />
        <Route path={'*'} element={<Error404 />} />
      </Routes>
      <Toaster />
    </Layout>
  );
};
