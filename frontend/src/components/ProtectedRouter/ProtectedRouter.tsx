import React from 'react';
import { ErrorPage } from '@/components/Errors/ErrorPage';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

export const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }) => {
  const user = useAppSelector(selectUser);

  if (!isAllowed) {
    const errorCode = user ? 403 : 401;
    return <ErrorPage errorCode={errorCode} />;
  }

  return children;
};
