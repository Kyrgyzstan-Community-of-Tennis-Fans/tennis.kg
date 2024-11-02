import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchNews } from '@/features/news/newsThunks';
import { selectNews, selectNewsPagesCount } from '@/features/news/newsSlice';
import NewsCard from '@/features/news/components/NewsCard';
import CustomPagination from '@/features/news/components/CustomPagination/CustomPagination';
import { DatePicker } from '@/features/news/components/DatePicker/DatePicker';
import NewsCreate from '@/features/news/components/NewsCreate/NewsCreate';

export const News: React.FC = () => {
  const [query, setQuery] = useState({
    startDate: '',
    endDate: '',
  });
  const [page, setPage] = useState(1);
  const [dateFilterApplied, setDateFilterApplied] = useState(false);
  const dispatch = useAppDispatch();

  const handleDateChange = (startDate: Date | undefined, endDate: Date | undefined) => {
    setQuery({
      startDate: startDate ? startDate.toISOString() : '',
      endDate: endDate ? endDate.toISOString() : '',
    });
  };

  useEffect(() => {
    if (query.startDate && query.endDate && !dateFilterApplied) {
      setPage(1);
      setDateFilterApplied(true);
    }
    dispatch(fetchNews({ page, startDate: query.startDate, endDate: query.endDate }));
  }, [dispatch, page, query, dateFilterApplied]);

  const news = useAppSelector(selectNews);
  const totalPages = useAppSelector(selectNewsPagesCount);

  return (
    <main>
      <div className='text-center py-20'>
        <h1 className='font-semibold leading-10 text-2xl sm:text-4xl md:text-5xl sm:2'>Свежие новости</h1>
        <h2 className='text-cr-gray-500 text-[20px] sm:text-2xl font-medium uppercase'>Наш блог</h2>
      </div>
      <NewsCreate />
      <DatePicker onDateChange={handleDateChange} />

      <div className='grid gap-5 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6'>
        {news.map((newsItem) => (
          <NewsCard key={newsItem._id} news={newsItem} />
        ))}
      </div>

      <CustomPagination page={page} total={totalPages} setPage={(page) => setPage(page)} />
    </main>
  );
};

