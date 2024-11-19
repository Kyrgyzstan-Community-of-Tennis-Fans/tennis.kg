import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
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
import { ErrorPage } from '@/components/Errors/ErrorPage';
import { getPermission } from '@/features/users/usersThunks';
import { ThemeProvider } from '@/ThemeProvider';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const page = useLocation().pathname.slice(1);

  useEffect(() => {
    dispatch(getFooterItems());
    if (user) {
      dispatch(getPermission(user._id));
    }
  }, [dispatch]);

  return (
    <ThemeProvider>
      <div className='flex flex-col min-h-dvh'>
      <header className='max-h-24 mb-16 sm:mb-24'>
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
          <Route path={'*'} element={<ErrorPage errorCode={404} />} />
        </Routes>
      </main>

      <footer className={`mt-auto ${page !== 'home' && 'pt-[218px]'}`}>
        <Footer />
      </footer>
      <Toaster />
    </div>
    </ThemeProvider>
  );
};
