import React from 'react';
import { Loader as LoaderIcon } from 'lucide-react';

interface Props {
  absolute?: boolean;
  fixed?: boolean;
  size?: number;
  className?: string;
}

export const Loader: React.FC<Props> = ({ absolute, fixed, size = 20, className }) => {
  return (
    <div
      className={`${absolute && 'absolute'} ${fixed && 'fixed'} top-1/2 left-1/2 ${(absolute || fixed) && '-translate-y-2/4 -translate-x-2/4'}`}
    >
      <LoaderIcon
        className={`animate-spin ${className ? className : 'text-muted-foreground'}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  );
};
