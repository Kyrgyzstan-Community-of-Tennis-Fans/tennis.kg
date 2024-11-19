import React from 'react';
import { useTheme } from '@/ThemeProvider';

interface Props {
  width: string;
  height: string;
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
  background: string;
  opacity?: string;
}

const GradientCircle: React.FC<Props> = ({ width, height, top, right, left, bottom, background, opacity }) => {
  const { theme } = useTheme();

  return theme === 'dark' ? null : (
    <div
      className={`hidden lg:block 2xl:hidden absolute z-[-9999] opacity-[${opacity}] rounded-full blur-[40px]`}
      style={{
        width,
        height,
        top,
        right,
        left,
        bottom,
        background,
      }}
    ></div>
  );
};

export default GradientCircle;
