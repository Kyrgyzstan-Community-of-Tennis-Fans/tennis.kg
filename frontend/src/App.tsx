import { useAppSelector } from '@/app/hooks';
import { Error404 } from '@/components/Errors/Error404';
import Footer from '@/components/Footer/Footer';
import { Layout } from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRouter/ProtectedRouter';
import { Toolbar } from '@/components/Toolbar/Toolbar';
import { Toaster } from '@/components/ui/sonner';
import { Category } from '@/features/category/category';
import Partners from '@/features/partners/Partners';
import { ForgotPassword } from '@/features/users/ForgotPassword';
import { Login } from '@/features/users/Login';
import { PersonalAccount } from '@/features/users/PersonalAccount';
import { Register } from '@/features/users/Register';
import { ResetPassword } from '@/features/users/ResetPassword';
import { selectUser } from '@/features/users/usersSlice';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BlockCarousel } from '@/features/carousel/BlockCarousel';
import { AdminPaneBlockCarousel } from '@/features/carousel/AdminPaneBlockCarousel';
import News from '@/features/news/News';
import AdminPartners from '@/features/partners/AdminPartners';
import RatingMembersAdminList from '@/features/mainRatingMembers/RatingMembersAdmin/RatingMembersAdminList';

export const App: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header className={'mb-32'}>
        <Toolbar />
      </header>
      <Layout>
        <Routes>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/reset-password/:token'} element={<ResetPassword />} />
          <Route path={'/forgot-password'} element={<ForgotPassword />} />
          <Route path={'/news'} element={<News />} />
          <Route path={'/partners'} element={<Partners />} />
          <Route
            path='/admin/partners'
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <AdminPartners />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/personal-account'}
            element={
              <ProtectedRoute isAllowed={user ? true : null}>
                <PersonalAccount />
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
          <Route path={'/carousel'} element={<BlockCarousel />} />
          <Route
            path={'/admin-panel-block-carousel'}
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <AdminPaneBlockCarousel />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/ratingMembers'}
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <RatingMembersAdminList />
              </ProtectedRoute>
            }
          />
          <Route path={'*'} element={<Error404 />} />
        </Routes>
      </Layout>

      <footer className={'mt-32'}>
        <Footer />
      </footer>
      <Toaster />
    </>
  );
};
