import React from 'react';
import { NewsTitle } from '@/features/news/components/NewsTitle/NewsTitle';
import { useNewsMain } from '@/features/news/hooks/useNewsMain';
import { NewsCardMain } from '@/features/news/components/NewsCardMain/NewsCardMain';

export const NewsMain: React.FC = () => {
  const { news } = useNewsMain();

  return (
    <>
      <NewsTitle />
      <div className='news-main-container'>
        {news.map((newsItem) => (
          <NewsCardMain key={newsItem._id} news={newsItem} />
        ))}
      </div>
    </>
  );
};
