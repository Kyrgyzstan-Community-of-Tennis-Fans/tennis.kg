import React from 'react';
import { News } from '@/types/news';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { API_URl } from '@/consts';

interface Props {
  news: News;
}

const NewsCard: React.FC<Props> = ({ news }) => {
  return (
    <Link to={`/news/${news._id}`} className='no-underline'>
      <Card className='shadow-none border-none max-w-[320px]'>
        <div className='flex flex-col rounded-md border-none'>
          <img src={API_URl + '/' + news.newsCover} alt={news.title} className='w-max h-max object-cover mb-6' />
          <div className='flex flex-wrap mt-auto items-start'>
            <div className='me-auto'>
              <h4 className='text-cr-black text-[16px]'>{news.subtitle}</h4>
              <h3 className='text-cr-black font-bold text-lg'>{news.title}</h3>
            </div>
            <span className='text-cr-green-900 font-medium text-sm'>{news.createdAt}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default NewsCard;
