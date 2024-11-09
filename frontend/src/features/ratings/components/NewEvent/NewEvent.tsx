import { useAppDispatch } from '@/app/hooks';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EventForm } from '@/features/ratings/components/EventForm/EventForm';
import { createEvent, fetchRatings } from '@/features/ratings/ratingsThunks';
import type { EventMutation } from '@/types/eventTypes';
import type { Rating } from '@/types/ratingTypes';
import React, { type PropsWithChildren, useRef } from 'react';
import { toast } from 'sonner';

interface Props extends PropsWithChildren {
  ratings: Rating[];
}

export const NewEvent: React.FC<Props> = ({ ratings, children }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();

  const handleCreateEvent = async (eventMutation: EventMutation) => {
    await dispatch(createEvent(eventMutation)).unwrap();
    await dispatch(fetchRatings()).unwrap();
    closeRef.current?.click();
    toast.success('Событие успешно добавлено');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={'pb-2'}>
        <DialogHeader>
          <DialogTitle>Новое событие</DialogTitle>
          <DialogDescription>
            Введите данные для создания нового события. После создания, событие будет доступно для просмотра на странице
            "Рейтинг".
          </DialogDescription>

          <EventForm onSubmit={handleCreateEvent} ratings={ratings} />
        </DialogHeader>
        <DialogClose ref={closeRef} />
      </DialogContent>
    </Dialog>
  );
};
