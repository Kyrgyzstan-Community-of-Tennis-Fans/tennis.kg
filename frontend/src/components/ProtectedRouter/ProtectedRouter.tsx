import { Error403 } from '@/components/Errors/Error403';
import React from 'react';

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

export const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Error403 />;
  }

  return children;
};
