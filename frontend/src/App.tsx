import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Error404 } from '@/components/Errors/Error404';
import { ProtectedRoute } from '@/components/ProtectedRouter/ProtectedRouter';
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
import { getFooterItems } from '@/features/footers/footersThunks';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const page = useLocation().pathname.slice(1);

  useEffect(() => {
    dispatch(getFooterItems());
  }, [dispatch]);

  return (
    <div className='flex flex-col min-h-dvh'>
      <header className={page === 'home' ? 'mb-32' : 'mb-10'}>
        <Navbar />
      </header>

      <main className='grow'>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/rating'} element={<Ratings />} />
          <Route path={'/reset-password/:token'} element={<ResetPassword />} />
          <Route path={'/forgot-password'} element={<ForgotPassword />} />
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

      <footer className={`mt-auto ${page !== '/' && 'mt-[218px]'}`}>
        <Footer />
      </footer>
      <Toaster />
    </div>
  );
};
