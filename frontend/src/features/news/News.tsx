import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchNews } from '@/features/news/newsThunks';
import NewsCard from '@/features/news/components/NewsCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'react-router-dom';
import { selectNews } from '@/features/news/newsSlice';

// const generateDummyNews = (count: number): News[] => {
//   return Array.from({ length: count }, (_, index) => ({
//     _id: `id_${index}`,
//     title: `Title ${index}`,
//     subtitle: `Subtitle ${index}`,
//     content: `Content ${index}`,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     newsCover: `cover_${index}.jpg`,
//     images: [`image_${index}_1.jpg`, `image_${index}_2.jpg`],
//   }));
// };

const News: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
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

      <div className='grid gap-5 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {news.map((newsItem) => (
          <NewsCard key={newsItem._id} news={newsItem} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#' isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
};

export default News;
