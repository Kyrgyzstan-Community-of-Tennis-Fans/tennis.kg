import React from 'react';
import { Layout } from '@/components/Layout';
import { News } from '@/features/news/containers/News/News';
import { NewsForm } from '@/features/news/components/NewsForm/NewsForm';

export const AdminNews: React.FC = () => {
  return (
    <Layout>
      <div className='flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5 mb-6'>
        <h1 className='text-2xl font-medium'>Управление новостями</h1>

        <NewsForm />
      </div>
      <News isAdmin />
    </Layout>
  );
};
