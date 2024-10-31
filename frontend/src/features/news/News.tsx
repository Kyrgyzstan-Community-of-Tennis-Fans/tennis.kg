import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchNews } from '@/features/news/newsThunks';
import { selectNews, selectNewsPagesCount } from '@/features/news/newsSlice';
import NewsCard from '@/features/news/components/NewsCard';
import CustomPagination from '@/features/news/components/CustomPagination/CustomPagination';
import { DatePicker } from '@/features/news/components/DateRangePicker/DateRangePicker';
import { Button } from '@/components/ui/button';

const News: React.FC = () => {
  const [query, setQuery] = useState({
    firstDate: '',
    secondDate: '',
  });
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const handleDateChange = (firstDate: Date | undefined, secondDate: Date | undefined) => {
    setQuery({
      firstDate: firstDate ? firstDate.toISOString() : '',
      secondDate: secondDate ? secondDate.toISOString() : '',
    });
  };

  const applyFilter = () => {
    setPage(1);
    console.log(query.firstDate, query.secondDate);
    dispatch(fetchNews({ page: 1, startDate: query.firstDate, endDate: query.secondDate }));
  };

  useEffect(() => {
    dispatch(fetchNews({ page }));
  }, [dispatch, page, query]);

  const news = useAppSelector(selectNews);
  const totalPages = useAppSelector(selectNewsPagesCount);

  return (
    <main>
      <div className='text-center my-6'>
        <h1 className='font-semibold leading-10 text-2xl sm:text-4xl md:text-5xl sm:mb-2'>Свежие новости</h1>
        <h2 className='text-cr-gray-500 text-[20px] sm:text-2xl font-medium uppercase'>Наш блог</h2>
      </div>
      <DatePicker onDateChange={handleDateChange} />
      <Button onClick={applyFilter}>Применить</Button>

      <div className='grid gap-5 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6'>
        {news.map((newsItem) => (
          <NewsCard key={newsItem._id} news={newsItem} />
        ))}
      </div>

      <CustomPagination page={page} total={totalPages} setPage={(page) => setPage(page)} />
    </main>
  );
};

export default News;
