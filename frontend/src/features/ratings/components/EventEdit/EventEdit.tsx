import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EventForm } from '@/features/ratings/components/RatingForm/EventForm/EventForm';
import { selectEvent, selectEventFetching } from '@/features/ratings/ratingsSlice';
import { editEvent, fetchRatings, getEvent } from '@/features/ratings/ratingsThunks';
import type { EventMutation } from '@/types/eventTypes';
import type { Rating } from '@/types/ratingTypes';
import React, { type PropsWithChildren, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props extends PropsWithChildren {
  id: string;
  ratings: Rating[];
}

export const EventEdit: React.FC<Props> = ({ id, ratings, children }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const event = useAppSelector(selectEvent);
  const eventFetching = useAppSelector(selectEventFetching);

  useEffect(() => {
    if (open) {
      dispatch(getEvent(id));
    }
  }, [dispatch, id, open]);

  console.log(event);

  const handleEdit = async (eventMutation: EventMutation) => {
    await dispatch(editEvent({ id, eventMutation })).unwrap();
    await dispatch(fetchRatings()).unwrap();
    toast.success('Событие успешно отредактировано');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {eventFetching ? (
          <Loader absolute />
        ) : (
          <DialogHeader>
            <DialogTitle>Редактирование события</DialogTitle>

            <DialogDescription>
              Введите данные для редактирования события. После редактирования, событие будет доступно для просмотра на
              странице "Рейтинг".
            </DialogDescription>

            <EventForm onSubmit={handleEdit} ratings={ratings} />
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
};
