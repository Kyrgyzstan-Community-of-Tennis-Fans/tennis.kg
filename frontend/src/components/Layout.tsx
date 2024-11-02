import { cn } from '@/lib/utils';
import React, { type PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
}

export const Layout: React.FC<Props> = ({ className, children }) => {
  return <div className={cn(className, 'container')}>{children}</div>;
};
