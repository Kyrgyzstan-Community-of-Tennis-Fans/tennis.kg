import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RatingForm } from '@/features/ratings/components/RatingForm/RatingForm';
import React, { type PropsWithChildren } from 'react';

export const NewRating: React.FC<PropsWithChildren> = ({ children }) => {
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

          <RatingForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
