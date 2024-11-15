import { useAppDispatch } from '@/app/hooks';
import { Confirm } from '@/components/Confirm/Confirm';
import { Button } from '@/components/ui/button';
import { EventEdit } from '@/features/ratings/components/EventEdit/EventEdit';
import { deleteEvent, fetchRatings } from '@/features/ratings/ratingsThunks';
import { Event } from '@/types/eventTypes';
import type { Rating } from '@/types/ratingTypes';
import { ArrowRightIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface Props {
  event: Event;
  ratings: Rating[];
}

export const EventCard: React.FC<Props> = ({ event, ratings }) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { category, link } = event;
  const idAdminPage = pathname.includes('admin');

  const handleDelete = async () => {
    await dispatch(deleteEvent(event._id)).unwrap();
    await dispatch(fetchRatings()).unwrap();
    toast.success('Событие успешно удалено');
  };

  return (
    <div className={'space-y-2 p-3 border bg-gray-200 mb-3 rounded-lg flex-1 min-w-56 dark:bg-transparent dark:border-gray-200'}>
      <div className={'bg-[#64B32C42] px-2 rounded-md'}>
        <h3 className={'text-sm'}>
          Категория - <span className={'font-medium'}>{category.name}</span>
        </h3>
      </div>

      <div className={'flex justify-between'}>
        {idAdminPage && (
          <div className={'flex gap-1'}>
            <Confirm onOk={handleDelete}>
              <button className={'bg-primary text-white px-1.5 rounded-md dark:bg-transparent '}>
                <TrashIcon className={'size-5 stroke-[1.2]'} />
              </button>
            </Confirm>

            <EventEdit ratings={ratings} id={event._id}>
              <button className={'bg-primary text-white px-1.5 rounded-md dark:bg-transparent '}>
                <PencilSquareIcon className={'size-5 stroke-[1.2]'} />
              </button>
            </EventEdit>
          </div>
        )}
        <a href={link} target={'_blank'} className={'block ml-auto'}>
          <Button
            size={'sm'}
            variant={'ghost'}
            className={'text-cr-green-700 flex items-center ml-auto hover:bg-gray-200 hover:text-cr-green-900'}
          >
            Открыть рейтинг <ArrowRightIcon />
          </Button>
        </a>
      </div>
    </div>
  );
};
