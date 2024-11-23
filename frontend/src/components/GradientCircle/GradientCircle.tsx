import React from 'react';
import { useTheme } from '@/ThemeProvider';

interface Props {
  width: string;
  height: string;
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
  visible: string;
}

const GradientCircle: React.FC<Props> = ({ width, height, top, right, left, bottom, visible }) => {
  const { theme } = useTheme();

  return theme === 'dark' ? null : (
    <div
      className={`hidden lmd:${visible === 'block' ? 'block' : 'hidden'} xl:block 3xl:hidden absolute z-[-9999] opacity-[18%] rounded-full blur-[40px] bg-gradient-to-r from-[rgba(79,173,13,0.34)] via-[#64b32c] to-[rgba(100,179,44,0.26)]`}
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
