import React from 'react';
import NewsCard from '@/features/news/components/NewsCard';

const News: React.FC = () => {
  return (
    <section>
      <div className='text-center my-6'>
        <h1 className='font-semibold leading-10 text-2xl sm:text-4xl md:text-5xl mb-2'>Свежие новости</h1>
        <h2 className='text-cr-gray-500 text-lg sm:text-lg'>Наш блог</h2>
      </div>

      <div className='grid gap-5 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
    </section>
  );
};

export default News;
