import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import { fetchNewsByLimit } from '@/features/news/newsThunks';
import { selectFetchNewsLoading, selectNews } from '@/features/news/newsSlice';

export const useNewsMain = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNewsByLimit({ limit: 3 }));
  }, [dispatch]);

  const news = useAppSelector(selectNews);
  const newsFetching = useAppSelector(selectFetchNewsLoading);
  return { news, newsFetching };
};
