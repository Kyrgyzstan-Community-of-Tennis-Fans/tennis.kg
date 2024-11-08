import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { API_URl } from '@/consts';
import { Button } from '@/components/ui/button';
import { News } from '@/types/news';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Confirm } from '@/components/Confirm/Confirm';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { removeNews } from '@/features/news/newsThunks';
import { NewsForm } from '@/features/news/components/NewsForm/NewsForm';
import { selectRemoveNewsLoading } from '@/features/news/newsSlice';
import './newsCard.css';

interface Props {
  news: News;
  isAdmin?: boolean;
}

const CardImage = memo(
  React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(({ className, alt, ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      className={cn('min-h-[300px] object-cover w-full mb-6 rounded-md', className)}
      {...props}
    />
  )),
);
CardImage.displayName = 'CardImage';

const arePropsEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.news._id === nextProps.news._id &&
    prevProps.news.title === nextProps.news.title &&
    prevProps.news.subtitle === nextProps.news.subtitle &&
    prevProps.news.newsCover === nextProps.news.newsCover &&
    prevProps.news.createdAt === nextProps.news.createdAt
  );
};

export const NewsCard: React.FC<Props> = React.memo(({ news, isAdmin = false }) => {
  const { _id, title, subtitle, newsCover, createdAt } = news;
  const dispatch = useAppDispatch();
  const newsRemoving = useAppSelector(selectRemoveNewsLoading);

  const handleDelete = async () => {
    try {
      const { toast } = await import('sonner');
      await dispatch(removeNews(_id)).unwrap();
      toast.success('Новость успешно удалена!');
    } catch (e) {
      const { toast } = await import('sonner');
      console.error(e);
      toast.error('Что-то пошло не так, попробуйте еще раз.');
    }
  };

  return (
    <Card className='news-card'>
      <Link to={`/news/${_id}`} className='news-link'>
        <CardHeader className='p-0'>
          <CardImage src={`${API_URl}/${newsCover}`} alt={title} />
        </CardHeader>
        <CardContent className='news-card-content'>
          <div className='me-auto'>
            <h4 className='news-card-subtitle'>{subtitle}</h4>
            <h3 className='news-card-title'>{title}</h3>
          </div>
          <span className='news-card-createdAt'>{createdAt}</span>
        </CardContent>
      </Link>
      {isAdmin && (
        <CardFooter className='flex flex-wrap justify-between items-center border-t pt-2'>
          <NewsForm isEdit newsId={_id} />

          <Confirm onOk={handleDelete}>
            <Button size='lg' disabled={newsRemoving === _id}>
              <TrashIcon />
            </Button>
          </Confirm>
        </CardFooter>
      )}
    </Card>
  );
}, arePropsEqual);
