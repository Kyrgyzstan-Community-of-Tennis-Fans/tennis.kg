import React from 'react';
import { useNews } from '@/features/news/hooks/useNews';
import { Layout } from '@/components/Layout';
import { NewsCard } from '@/features/news/components/NewsCard/NewsCard';
import { CustomPagination } from '@/features/news/components/CustomPagination/CustomPagination';
import { DatePicker } from '@/features/news/components/DatePicker/DatePicker';
import NewsCreate from '@/features/news/components/NewsCreate/NewsCreate';

const News: React.FC = () => {
  const { news, totalPages, page, setPage, handleDateChange } = useNews();

  return (
    <Layout>
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
    </Layout>
  );
};

export default News;
