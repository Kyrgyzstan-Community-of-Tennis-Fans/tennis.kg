import React from 'react';
import { Layout } from '@/components/Layout';
import { NewsCreate } from '@/features/news/components/NewsCreate/NewsCreate';

export const AdminNews: React.FC = () => {
  return (
    <Layout>
      <div className='flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'>
        <h1 className='text-2xl font-medium'>Управление новостями</h1>

        <NewsCreate />
      </div>
    </Layout>
  );
};
