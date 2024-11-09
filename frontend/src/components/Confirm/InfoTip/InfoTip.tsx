import React, { type PropsWithChildren } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Props extends PropsWithChildren {
  text: string;
  delay?: number;
  className?: string;
}

export const InfoTip: React.FC<Props> = ({ text, delay, className, children }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delay}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={className}>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
