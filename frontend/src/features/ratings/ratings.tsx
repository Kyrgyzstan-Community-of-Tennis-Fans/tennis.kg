import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Layout } from '@/components/Layout';
import { Skeleton } from '@/components/ui/skeleton';
import { RatingBlock } from '@/features/ratings/components/RatingBlock/RatingBlock';
import { selectRatings, selectRatingsFetching } from '@/features/ratings/ratingsSlice';
import { fetchRatings } from '@/features/ratings/ratingsThunks';
import React, { useEffect } from 'react';
import styles from './ratings.module.css';

export const Ratings: React.FC = () => {
  const dispatch = useAppDispatch();
  const ratings = useAppSelector(selectRatings);
  const ratingsFetching = useAppSelector(selectRatingsFetching);

  useEffect(() => {
    dispatch(fetchRatings());
  }, [dispatch]);

  const maleRatings = ratings.filter((rating) => rating.chapter === 'male');
  const femaleRatings = ratings.filter((rating) => rating.chapter === 'female');
  const mixedRatings = ratings.filter((rating) => rating.chapter === 'mixed');

  return (
    <Layout>
      <header className={'text-center mb-32'}>
        <h1 className={'text-6xl font-bold mb-12'}>
          Рейтинг членов <span className={styles.title}>КСЛТ</span>
        </h1>
        <p className={'max-w-screen-xl mx-auto text-2xl text-[#808080]'}>
          На этой странице вы можете ознакомиться с текущим рейтингом. Рейтинговая система обновляется с каждым
          рейтинговым турниром. С более подробной информацией о начислении очков, вы можете ознакомиться в разделе
          "Положение. Таблица начисления рейтинговых очков".
        </p>
      </header>

      <section>
        {ratingsFetching ? (
          Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className={'w-full h-16 mb-8'} />)
        ) : !ratingsFetching && ratings.length === 0 ? (
          <span className={'block text-center text-muted-foreground'}>
            Не удалось загрузить рейтинги. Пожалуйста, попробуйте обновить страницу
          </span>
        ) : (
          <div className={'space-y-10'}>
            {maleRatings.length > 0 && (
              <div>
                <h3 className={'font-bold text-center text-xl mb-3'}>Мужской рейтинг</h3>
                <RatingBlock ratings={maleRatings} />
              </div>
            )}

            {femaleRatings.length > 0 && (
              <div>
                <h3 className={'font-bold text-center text-xl mb-3'}>Женский рейтинг</h3>
                <RatingBlock ratings={femaleRatings} />
              </div>
            )}

            {mixedRatings.length > 0 && (
              <div>
                <h3 className={'font-bold text-center text-xl mb-3'}>Смешанный рейтинг</h3>
                <RatingBlock ratings={mixedRatings} />
              </div>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
};
