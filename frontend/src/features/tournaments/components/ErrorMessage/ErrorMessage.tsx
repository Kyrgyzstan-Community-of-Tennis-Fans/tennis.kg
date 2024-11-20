import React from 'react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  children: React.ReactNode;
  type?: 'error' | 'warning' | 'info';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, type = 'error' }) => {
  const messageClass = cn(
    'text-xs',
    type === 'error' && 'text-red-500',
    type === 'warning' && 'text-yellow-500',
    type === 'info' && 'text-grey-500',
  );

  return <small className={messageClass}>{children}</small>;
};

export default ErrorMessage;
