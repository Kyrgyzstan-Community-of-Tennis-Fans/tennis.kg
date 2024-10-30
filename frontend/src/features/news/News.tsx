import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchNews } from '@/features/news/newsThunks';
import NewsCard from '@/features/news/components/NewsCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'react-router-dom';
import { selectNews, selectNewsPagesCount } from '@/features/news/newsSlice';

const News: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const page = parseInt(searchParams.get('page') as string, 10) || 1;
  const limit = parseInt(searchParams.get('limit') as string, 10) || 12;

  useEffect(() => {
    dispatch(fetchNews({ page, limit }));
  }, [dispatch, page, limit]);

  const news = useAppSelector(selectNews);
  const pages = useAppSelector(selectNewsPagesCount);

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

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {page > 1 ? (
              <PaginationPrevious href={`?page=${page - 1}&limit=${limit}`} />
            ) : (
              <span className='text-gray-400 cursor-not-allowed'>Previous</span>
            )}
          </PaginationItem>
          {Array.from({ length: pages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink href={`?page=${index + 1}&limit=${limit}`} isActive={page === index + 1}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            {page < pages ? (
              <PaginationNext href={`?page=${page + 1}&limit=${limit}`} />
            ) : (
              <span className='text-gray-400 cursor-not-allowed'>Next</span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
};

export default News;
