import React from 'react';
import { useNews } from '@/features/news/hooks/useNews';
import { Layout } from '@/components/Layout';
import { CustomPagination } from '@/features/news/components/CustomPagination/CustomPagination';
import { DatePicker } from '@/features/news/components/DatePicker/DatePicker';
import { Loader } from '@/components/Loader/Loader';
import { NewsCard } from '@/features/news/components/NewsCard/NewsCard';
import './news.css';

interface Props {
  isAdmin?: boolean;
}

export const News: React.FC<Props> = ({ isAdmin }) => {
  const { news, newsFetching, totalPages, page, setPage, handleDateChange } = useNews();

  if (newsFetching) return <Loader fixed />;
  let noDataContent;

  switch (true) {
    case isAdmin:
      noDataContent = <h2 className='news-subtitle text-center'>Новости не найдены. Добавьте новость.</h2>;
      break;
    default:
      noDataContent = <h2 className='news-subtitle text-center'>На данный момент новостей нету</h2>;
      break;
  }

  return (
    <Layout>
      {!isAdmin && (
        <div className='news-title-block'>
          <h1 className='news-main-title'>Свежие новости</h1>
          <h2 className='news-subtitle'>Наш блог</h2>
        </div>
      )}
      {!newsFetching && news.length === 0 ? (
        noDataContent
      ) : (
        <>
          <DatePicker onDateChange={handleDateChange} />

          <div className='news-container'>
            {news.map((newsItem) => (
              <NewsCard key={newsItem._id} news={newsItem} isAdmin={isAdmin} />
            ))}
          </div>

          <CustomPagination page={page} total={totalPages} setPage={(page) => setPage(page)} />
        </>
      )}
    </Layout>
  );
};
