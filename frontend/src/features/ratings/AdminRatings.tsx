import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { NewRating } from '@/features/ratings/components/NewRating/NewRating';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const AdminRatings: React.FC = () => {
  return (
    <Layout>
      <header className={'flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'}>
        <div>
          <h1 className={'text-2xl font-medium leading-none'}>Рейтинги</h1>
          <small className={'text-muted-foreground text-base'}>Список всех рейтингов и управление рейтингами.</small>
        </div>

        <NewRating>
          <Button className={'w-full xs:w-max'}>
            Добавить рейтинг <SquaresPlusIcon />
          </Button>
        </NewRating>
      </header>
    </Layout>
  );
};
