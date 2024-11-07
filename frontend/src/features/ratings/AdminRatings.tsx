import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { NewEvent } from '@/features/ratings/components/NewEvent/NewEvent';
import { NewRating } from '@/features/ratings/components/NewRating/NewRating';
import { RatingBlock } from '@/features/ratings/components/RatingBlock/RatingBlock';
import { selectRatings, selectRatingsFetching } from '@/features/ratings/ratingsSlice';
import { fetchRatings } from '@/features/ratings/ratingsThunks';
import { CalendarDaysIcon, SquaresPlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';

export const AdminRatings: React.FC = () => {
  const dispatch = useAppDispatch();
  const ratings = useAppSelector(selectRatings);
  const ratingsFetching = useAppSelector(selectRatingsFetching);

  useEffect(() => {
    dispatch(fetchRatings());
  }, [dispatch]);

  return (
    <Layout>
      <header className={'flex md:items-center justify-between gap-2 flex-col md:flex-row border-b pb-1.5'}>
        <div>
          <h1 className={'text-2xl font-medium leading-none'}>Рейтинги</h1>
          <small className={'text-muted-foreground text-base'}>Список всех рейтингов и управление рейтингами.</small>
        </div>

        <div className={'flex flex-col md:flex-row items-center gap-2'}>
          <NewRating>
            <Button size={'sm'} className={'w-full font-normal'}>
              Добавить рейтинг <SquaresPlusIcon />
            </Button>
          </NewRating>
          <NewEvent ratings={ratings}>
            <Button size={'sm'} className={'w-full font-normal'}>
              Добавить событие <CalendarDaysIcon />
            </Button>
          </NewEvent>
        </div>
      </header>

      <section>
        {ratingsFetching ? (
          <div className={'grid grid-cols-4 gap-2 mt-4'}>
            <Skeleton className={'h-24 flex-1'} />
            <Skeleton className={'h-24 flex-1'} />
            <Skeleton className={'h-24 flex-1'} />
            <Skeleton className={'h-24 flex-1'} />
            <Skeleton className={'h-24 flex-1'} />
            <Skeleton className={'h-24 flex-1'} />
            <Skeleton className={'h-24 flex-1'} />
            <Skeleton className={'h-24 flex-1'} />
            <Skeleton className={'h-24 flex-1'} />
            <Skeleton className={'h-24 flex-1'} />
            <Skeleton className={'h-24 flex-1'} />
            <Skeleton className={'h-24 flex-1'} />
          </div>
        ) : (
          <div className={'mt-4'}>
            <RatingBlock ratings={ratings} />
          </div>
        )}
      </section>
    </Layout>
  );
};
