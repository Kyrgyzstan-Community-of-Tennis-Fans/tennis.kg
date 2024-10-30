import React from 'react';
import { Loader as LoaderIcon } from 'lucide-react';

interface Props {
  absolute?: boolean;
  fixed?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  theme?: 'light' | 'dark';
}

export const Loader: React.FC<Props> = ({ absolute, fixed, size = 'md', className, theme = 'dark' }) => {
  const sizePx = size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px';

  return (
    <div
      className={`${absolute && 'absolute'} ${fixed && 'fixed'} top-1/2 left-1/2 ${(absolute || fixed) && '-translate-y-2/4 -translate-x-2/4'}`}
    >
      <LoaderIcon
        className={`animate-spin ${theme === 'light' ? 'text-muted' : 'text-muted-foreground'} ${className && className}`}
        style={{
          width: sizePx,
          height: sizePx,
        }}
      />
    </div>
  );
};
