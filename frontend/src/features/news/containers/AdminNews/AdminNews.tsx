import React from 'react';
import { Layout } from '@/components/Layout';
import { NewsForm } from '@/features/news/components/NewsForm/NewsForm';
import { NewsCard } from '@/features/news/components/NewsCard/NewsCard';
import { CustomPagination } from '@/features/news/components/CustomPagination/CustomPagination';
import { useNews } from '@/features/news/hooks/useNews';
import { DatePicker } from '@/features/news/components/DatePicker/DatePicker';

export const AdminNews: React.FC = () => {
  const { news, totalPages, page, setPage, handleDateChange } = useNews();

  return (
    <Layout>
      <div className='flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5 mb-6'>
        <h1 className='text-2xl font-medium'>Управление новостями</h1>

        <NewsForm />
      </div>
      <DatePicker onDateChange={handleDateChange} />

      <div className='news-container'>
        {news.map((newsItem) => (
          <NewsCard key={newsItem._id} isAdmin news={newsItem} />
        ))}
      </div>

      <CustomPagination page={page} total={totalPages} setPage={(page) => setPage(page)} />
    </Layout>
  );
};
