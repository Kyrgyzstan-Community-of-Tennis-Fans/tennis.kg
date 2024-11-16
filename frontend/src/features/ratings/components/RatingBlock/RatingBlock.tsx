import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Confirm } from '@/components/Confirm/Confirm';
import { Loader } from '@/components/Loader/Loader';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/features/ratings/components/EventCard/EventCard';
import { selectRatingsDeleting } from '@/features/ratings/ratingsSlice';
import { deleteRating } from '@/features/ratings/ratingsThunks';
import { getMonth } from '@/lib/getMonth';
import type { Rating } from '@/types/ratingTypes';
import { TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface Props {
  ratings: Rating[];
}

export const RatingBlock: React.FC<Props> = ({ ratings }) => {
  const dispatch = useAppDispatch();
  const ratingsDeleting = useAppSelector(selectRatingsDeleting);
  const { pathname } = useLocation();
  const isAdminPage = pathname.includes('admin');

  const handleDelete = async (id: string) => {
    await dispatch(deleteRating(id)).unwrap();
    toast.success('Рейтинг успешно удален');
  };

  return (
    <Accordion type='single' collapsible>
      {ratings.map((rating, index) => {
        const isDeleting = ratingsDeleting === rating._id;
        return (
          <AccordionItem key={index} value={`item-${index}`} className={'px-4 relative'} disabled={isDeleting}>
            <AccordionTrigger className={'capitalize text-lg'}>
              {isAdminPage && (
                <Confirm onOk={() => handleDelete(rating._id)}>
                  <Button asChild size={'icon'}>
                    <span>{isDeleting ? <Loader theme={'light'} /> : <TrashIcon />}</span>
                  </Button>
                </Confirm>
              )}
              <span className={'w-full ml-2'}>
                {getMonth(rating.month)} － {rating.year}
              </span>
            </AccordionTrigger>

            <AccordionContent id={'accordion'}>
              {rating.events.length === 0 ? (
                <span className={'block text-center text-muted-foreground'}>
                  В {getMonth(rating.month, 'ending')} {rating.year} года нет событий
                </span>
              ) : (
                <div className={'grid gap-2 sm:grid-cols-2 lg:grid-cols-3'}>
                  {rating.events.map((event, index) => (
                    <EventCard key={index} event={event} ratings={ratings} />
                  ))}
                </div>
              )}
            </AccordionContent>
            {isDeleting && (
              <div
                className={
                  'absolute rounded w-full h-full bg-gray-950/20 top-1/2 -translate-y-2/4 left-1/2 -translate-x-2/4'
                }
              />
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
