import React from 'react';
import { useAppSelector } from '@/app/hooks';
import { Error404 } from '@/components/Errors/Error404';
import Footer from '@/components/Footer/Footer';
import { ProtectedRoute } from '@/components/ProtectedRouter/ProtectedRouter';
import { Toolbar } from '@/components/Toolbar/Toolbar';
import { Toaster } from '@/components/ui/sonner';
import { Ratings } from '@/features/ratings/ratings';
import { ForgotPassword } from '@/features/users/ForgotPassword';
import { Login } from '@/features/users/Login';
import { PersonalAccount } from '@/features/users/PersonalAccount';
import { Register } from '@/features/users/Register';
import { ResetPassword } from '@/features/users/ResetPassword';
import { selectUser } from '@/features/users/usersSlice';
import { Home } from '@/pages/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import { NewsPage } from '@/features/news/containers/NewsPage/NewsPage';
import { OneNews } from '@/features/news/containers/OneNews/OneNews';
import AdminPanel from '@/pages/AdminPanel';
import Calendar from '@/pages/Calendar';

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
          <Route path={'/rating'} element={<Ratings />} />
          <Route path={'/reset-password/:token'} element={<ResetPassword />} />
          <Route path={'/forgot-password'} element={<ForgotPassword />} />
          <Route path={'/calendar'} element={<Calendar />} />
          <Route
            path={'/personal-account'}
            element={
              <ProtectedRoute isAllowed={user ? true : null}>
                <PersonalAccount />
              </ProtectedRoute>
            }
          />

          <Route path={'/news'} element={<NewsPage />} />
          <Route path={'/news/:id'} element={<OneNews />} />
          <Route
            path={'admin'}
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
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
