import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchNews } from '@/features/news/newsThunks';
import { selectNews, selectNewsPagesCount } from '@/features/news/newsSlice';
import NewsCard from '@/features/news/components/NewsCard';
import CustomPagination from '@/features/news/components/CustomPagination/CustomPagination';
import { DatePickerWithRange } from '@/features/news/components/DateRangePicker/DateRangePicker';

const News: React.FC = () => {
  const [query, setQuery] = useState({
    firstDate: '',
    secondDate: '',
  });
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const queriesChangeHandler = (key, value) => {
    setQuery((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchNews({ page }));
  }, [dispatch, page]);

  const news = useAppSelector(selectNews);
  const totalPages = useAppSelector(selectNewsPagesCount);

  return (
    <main>
      <div className='text-center my-6'>
        <h1 className='font-semibold leading-10 text-2xl sm:text-4xl md:text-5xl sm:mb-2'>Свежие новости</h1>
        <h2 className='text-cr-gray-500 text-[20px] sm:text-2xl font-medium uppercase'>Наш блог</h2>
      </div>
      <DatePickerWithRange />

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
