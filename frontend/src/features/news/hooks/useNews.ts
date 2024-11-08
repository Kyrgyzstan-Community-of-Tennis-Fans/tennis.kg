import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchNews } from '@/features/news/newsThunks';
import { selectFetchNewsLoading, selectNews, selectNewsPagesCount } from '@/features/news/newsSlice';

export const useNews = () => {
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
  const newsFetching = useAppSelector(selectFetchNewsLoading);

  return {
    news,
    newsFetching,
    totalPages,
    page,
    setPage,
    handleDateChange,
  };
};
