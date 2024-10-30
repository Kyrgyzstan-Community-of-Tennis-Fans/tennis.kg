import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useSearchParams } from 'react-router-dom';
import { fetchNews } from '@/features/news/newsThunks';
import { selectNews } from '@/features/news/newsSlice';
import NewsCard from '@/features/news/components/NewsCard';
import CustomPagination from '@/features/news/components/CustomPagination/CustomPagination';

const News: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') as string, 10) || 1;
  const limit = parseInt(searchParams.get('limit') as string, 10) || 12;

  useEffect(() => {
    dispatch(fetchNews({ page, limit }));
  }, [dispatch, page, limit]);

  const news = useAppSelector(selectNews);

  return (
    <main>
      <div className='text-center my-6'>
        <h1 className='font-semibold leading-10 text-2xl sm:text-4xl md:text-5xl sm:mb-2'>Свежие новости</h1>
        <h2 className='text-cr-gray-500 text-[20px] sm:text-2xl font-medium uppercase'>Наш блог</h2>
      </div>

      <div className='grid gap-5 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6'>
        {news.map((newsItem) => (
          <NewsCard key={newsItem._id} news={newsItem} />
        ))}
      </div>

      <CustomPagination page={page} limit={limit} />
    </main>
  );
};

export default News;
