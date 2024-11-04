import React from 'react';
import { useAppSelector } from '@/app/hooks';
import { Error404 } from '@/components/Errors/Error404';
import Footer from '@/components/Footer/Footer';
import { ProtectedRoute } from '@/components/ProtectedRouter/ProtectedRouter';
import { Toolbar } from '@/components/Toolbar/Toolbar';
import { Toaster } from '@/components/ui/sonner';
import { AdminPaneBlockCarousel } from '@/features/carousel/AdminPaneBlockCarousel';
import { Category } from '@/features/category/category';
import AdminPartners from '@/features/partners/AdminPartners';
import { ForgotPassword } from '@/features/users/ForgotPassword';
import { Login } from '@/features/users/Login';
import { PersonalAccount } from '@/features/users/PersonalAccount';
import { Register } from '@/features/users/Register';
import { ResetPassword } from '@/features/users/ResetPassword';
import { selectUser } from '@/features/users/usersSlice';
import { Home } from '@/pages/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import News from '@/features/news/News';
import { OneNews } from '@/features/news/OneNews';

export const App: React.FC = () => {
  const user = useAppSelector(selectUser);
  const page = useLocation().pathname.slice(1);

  return (
    <div className='flex flex-col min-h-dvh'>
      <header className={page === 'home' ? 'mb-32' : 'mb-10'}>
        <Toolbar />
      </header>

      <main className='grow'>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/reset-password/:token'} element={<ResetPassword />} />
          <Route path={'/forgot-password'} element={<ForgotPassword />} />
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
            path={'/admin/category'}
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/admin/carousel'}
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <AdminPaneBlockCarousel />
              </ProtectedRoute>
            }
          />

          <Route path={'/news'} element={<News />} />
          <Route path={'/news/:id'} element={<OneNews />} />

          <Route path={'*'} element={<Error404 />} />
        </Routes>
      </main>

      <footer className={`mt-auto ${page !== 'home' && 'pt-14'}`}>
        <Footer />
      </footer>
      <Toaster />
    </div>
  );
};
