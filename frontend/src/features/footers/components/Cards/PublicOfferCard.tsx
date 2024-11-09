import { Card } from '@/components/ui/card';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface Props {
  publicOfferText: string;
}

export const PublicOfferCard: React.FC<Props> = ({ publicOfferText }) => {
  return (
    <Card className='p-3 shadow-none relative min-w-72 flex-1'>
      <div className='flex items-center gap-2 justify-between lg:flex-row flex-wrap'>
        <div className='flex items-center gap-2 whitespace-normal max-w-full'>
          <DocumentTextIcon className='h-6 w-6 mr-2 shrink-0' />
          <span className='truncate'>{publicOfferText}</span>
        </div>
      </div>
    </Card>
  );
};
