import React from 'react';
import { useTheme } from '@/ThemeProvider';

interface Props {
  width: string;
  height: string;
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
}

const GradientCircle: React.FC<Props> = ({ width, height, top, right, left, bottom }) => {
  const { theme } = useTheme();

  return theme === 'dark' ? null : (
    <div
      className='hidden lg:block 2xl:hidden absolute z-[-9999] opacity-[13%] rounded-full blur-[40px] bg-gradient-to-r from-[rgba(79,173,13,0.34)] via-[#64b32c] to-[rgba(100,179,44,0.26)]'
      style={{
        width,
        height,
        top,
        right,
        left,
        bottom,
      }}
    />
  );
};

export default GradientCircle;
