import React, { useEffect } from 'react';
import NewsCard from '@/features/news/components/NewsCard';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchNews } from '@/features/news/newsThunks';
import { selectNews } from '@/features/news/newsSlice';

const News: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const news = useAppSelector(selectNews);

  return (
    <main>
      <div className='text-center my-6'>
        <h1 className='font-semibold leading-10 text-2xl sm:text-4xl md:text-5xl sm:mb-2'>Свежие новости</h1>
        <h2 className='text-cr-gray-500 text-[20px] sm:text-2xl font-medium uppercase'>Наш блог</h2>
      </div>

      <div className='grid gap-5 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {news.map((newsItem) => (
          <NewsCard key={newsItem._id} news={newsItem} />
        ))}
      </div>
    </main>
  );
};

export default News;
