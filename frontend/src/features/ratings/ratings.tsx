import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Layout } from '@/components/Layout';
import { Skeleton } from '@/components/ui/skeleton';
import { selectRatings, selectRatingsFetching } from '@/features/ratings/ratingsSlice';
import { fetchRatings } from '@/features/ratings/ratingsThunks';
import styles from './ratings.module.css';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React, { useEffect } from 'react';

export const Ratings: React.FC = () => {
  const dispatch = useAppDispatch();
  const ratings = useAppSelector(selectRatings);
  const ratingsFetching = useAppSelector(selectRatingsFetching);

  useEffect(() => {
    dispatch(fetchRatings());
  }, [dispatch]);

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
          Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className={'w-full h-10 mb-2'} />)
        ) : !ratingsFetching && ratings.length === 0 ? (
          <span className={'block text-center text-muted-foreground'}>
            Не удалось загрузить рейтинги. Пожалуйста, попробуйте обновить страницу
          </span>
        ) : (
          <Accordion type='single' collapsible>
            {ratings.map((rating, index) => {
              const gender = rating.gender === 'male' ? 'Мужской' : 'Женский';

              return (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className={'capitalize text-lg'}>
                    {rating.month} － {rating.year}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className={'text-base space-y-2'}>
                      <div className={'flex gap-2 items-center'}>
                        <h4 className={'px-2 bg-gray-200 max-w-max rounded-lg'}>
                          Категория - <span className={'text-[#64B32C]'}>{rating.category.name}</span>
                        </h4>
                        <h4 className={'px-2 bg-gray-200 max-w-max rounded-lg capitalize'}>Пол - {gender}</h4>
                      </div>

                      <span className={'ml-1 block'}>
                        Рейтинг - {''}
                        <a href={rating.link} className={'text-[#3F6A11] underline underline-offset-2'}>
                          {rating.link}
                        </a>
                      </span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </section>
    </Layout>
  );
};
