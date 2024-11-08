import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { API_URl } from '@/consts';
import { News } from '@/types/news';

interface Props {
  news: News;
}

const arePropsEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.news._id === nextProps.news._id &&
    prevProps.news.title === nextProps.news.title &&
    prevProps.news.subtitle === nextProps.news.subtitle &&
    prevProps.news.newsCover === nextProps.news.newsCover
  );
};

export const NewsCardMain: React.FC<Props> = React.memo(({ news }) => {
  const { _id, title, subtitle, newsCover } = news;

  return (
    <Link to={`/news/${_id}`} className='news-link'>
      <Card className='news-card-main' style={{ backgroundImage: `url(${API_URl}/${newsCover})` }}>
        <CardContent className='flex flex-col h-full'>
          <div className='mt-auto'>
            <p className='text-white text-[18px]'>{subtitle}</p>
            <h3 className='text-white text-[18px] font-bold'>{title}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}, arePropsEqual);
