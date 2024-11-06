import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Event } from '@/types/eventTypes';

interface Props {
  event: Event;
}

export const EventCard: React.FC<Props> = ({ event }) => {
  const { category, link } = event;
  const gender = event.gender === 'male' ? 'Мужчины' : 'Женщины';

  return (
    <div className={'space-y-2 p-3 border bg-gray-200 mb-3 rounded-lg flex-1 min-w-56'}>
      <div className={'bg-[#64B32C42] px-2 rounded-md'}>
        <h3 className={'text-sm'}>
          Категория - <span className={'font-medium'}>{category.name}</span>
        </h3>
      </div>
      <div className={'bg-[#64B32C42] px-2 rounded-md'}>
        <h3 className={'text-sm'}>
          Пол - <span className={'font-medium'}>{gender}</span>
        </h3>
      </div>

      <a href={link} target={'_blank'} className={'block'}>
        <Button
          size={'sm'}
          variant={'ghost'}
          className={'text-cr-green-700 flex items-center ml-auto hover:bg-gray-200 hover:text-cr-green-900'}
        >
          Открыть рейтинг <ArrowRightIcon />
        </Button>
      </a>
    </div>
  );
};
