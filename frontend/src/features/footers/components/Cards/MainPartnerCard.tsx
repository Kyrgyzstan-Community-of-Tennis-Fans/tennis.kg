import { Card } from '@/components/ui/card';
import React from 'react';
import { API_URl } from '@/consts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
  image: string;
}

export const MainPartnerCard: React.FC<Props> = ({ image }) => {
  return (
    <Card className='p-3 shadow-none relative min-w-72 flex-1'>
      <div className='flex items-center gap-2 justify-between lg:flex-row flex-nowrap'>
        <div className='flex items-center'>
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <img
                  src={`${API_URl}/${image}`}
                  alt='Логотип партнера'
                  className='rounded-[5px] object-cover h-[30px] w-[30px] mr-2 cursor-pointer'
                />
              </TooltipTrigger>
              <TooltipContent className='bg-muted w-30 h-36 border drop-shadow-2xl'>
                <img alt='Логотип компании' className='w-full h-full rounded' src={`${API_URl}/${image}`} />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className='text-[14px] sm:text-[16px]'>Предпросмотр изображения главного партнера</span>
        </div>
      </div>
    </Card>
  );
};
