import React from 'react';
import { NewsForm } from '@/features/news/components/NewsForm/NewsForm';
import { NewsPage } from '@/features/news/containers/NewsPage/NewsPage';

export const AdminNews: React.FC = () => {
  return (
    <>
      <div className='flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5 mb-6'>
        <h1 className='text-2xl font-medium'>Управление новостями</h1>

        <NewsForm />
      </div>
      <NewsPage isAdmin />
    </>
  );
};
