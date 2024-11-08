import React from 'react';
import { useNews } from '@/features/news/hooks/useNews';
import { Layout } from '@/components/Layout';
import { CustomPagination } from '@/features/news/components/CustomPagination/CustomPagination';
import { DatePicker } from '@/features/news/components/DatePicker/DatePicker';
import { NewsCard } from '@/features/news/components/NewsCard/NewsCard';
import { NewsTitle } from '@/features/news/components/NewsTitle/NewsTitle';
import './newsPage.css';

interface Props {
  isAdmin?: boolean;
}

export const NewsPage: React.FC<Props> = ({ isAdmin }) => {
  const { news, newsFetching, totalPages, page, setPage, handleDateChange } = useNews();

  // if (newsFetching) return <Loader fixed />;
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
      {!isAdmin && <NewsTitle />}
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