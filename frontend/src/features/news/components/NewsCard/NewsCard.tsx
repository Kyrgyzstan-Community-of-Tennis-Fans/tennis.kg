import React from 'react';
import { News } from '@/types/news';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { API_URl } from '@/consts';
import { Link } from 'react-router-dom';
import './newsCard.css';
import { cn } from '@/lib/utils';

interface Props {
  news: News;
}

const CardImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, alt, ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      className={cn('min-h-[300px] object-cover w-full mb-6 rounded-md', className)}
      {...props}
    />
  ),
);
CardImage.displayName = 'CardImage';

export const NewsCard: React.FC<Props> = ({ news }) => {
  return (
    <Card className='news-card'>
      <Link to={`/news/${news._id}`} className='news-link'>
        <CardHeader className='p-0'>
          <CardImage src={`${API_URl}/${news.newsCover}`} alt={news.title} />
        </CardHeader>
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
