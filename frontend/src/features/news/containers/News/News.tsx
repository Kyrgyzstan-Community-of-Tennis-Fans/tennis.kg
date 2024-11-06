import React from 'react';
import { useNews } from '@/features/news/hooks/useNews';
import { Layout } from '@/components/Layout';
import { NewsCard } from '@/features/news/components/NewsCard/NewsCard';
import { CustomPagination } from '@/features/news/components/CustomPagination/CustomPagination';
import { DatePicker } from '@/features/news/components/DatePicker/DatePicker';
import './news.css';

export const News: React.FC = () => {
  const { news, totalPages, page, setPage, handleDateChange } = useNews();

  return (
    <Layout>
      <div className='news-title-block'>
        <h1 className='news-main-title'>Свежие новости</h1>
        <h2 className='news-subtitle'>Наш блог</h2>
      </div>
      <DatePicker onDateChange={handleDateChange} />

      <div className='news-container'>
        {news.map((newsItem) => (
          <NewsCard key={newsItem._id} news={newsItem} />
        ))}
      </div>

      <CustomPagination page={page} total={totalPages} setPage={(page) => setPage(page)} />
    </Layout>
  );
};
