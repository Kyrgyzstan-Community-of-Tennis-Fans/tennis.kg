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
import { RatingForm } from '@/features/ratings/components/RatingForm/RatingForm';
import { createRating } from '@/features/ratings/ratingsThunks';
import type { RatingMutation } from '@/types/rating';
import React, { type PropsWithChildren, useRef } from 'react';
import { toast } from 'sonner';

export const NewRating: React.FC<PropsWithChildren> = ({ children }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();

  const handleCreateRating = async (rating: RatingMutation) => {
    await dispatch(createRating(rating)).unwrap();
    closeRef.current?.click();
    toast.success('Рейтинг успешно добавлен');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый рейтинг</DialogTitle>
          <DialogDescription>
            Введите данные для создания нового рейтинга. После создания, рейтинг будет доступен для просмотра на
            странице "Рейтинг".
          </DialogDescription>

          <RatingForm onSubmit={handleCreateRating} />
        </DialogHeader>
        <DialogClose ref={closeRef} />
      </DialogContent>
    </Dialog>
  );
};
