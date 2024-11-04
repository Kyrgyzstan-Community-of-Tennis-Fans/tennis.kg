import React from 'react';
import { News } from '@/types/news';
import { Card, CardContent } from '@/components/ui/card';
import { API_URl } from '@/consts';
import { Link } from 'react-router-dom';
import './newsCard.css';

interface Props {
  news: News;
}

export const NewsCard: React.FC<Props> = ({ news }) => {
  return (
    <Card className='news-card'>
      <Link to={`/news/${news._id}`} className='news-link'>
        <img src={`${API_URl}/${news.newsCover}`} alt={news.title} className='news-image' />
        <CardContent className='news-card-content'>
          <div className='me-auto'>
            <h4 className='news-card-subtitle'>{news.subtitle}</h4>
            <h3 className='news-card-title'>{news.title}</h3>
          </div>
          <span className='news-card-createdAt'>{news.createdAt}</span>
        </CardContent>
      </Link>
    </Card>
  );
};
