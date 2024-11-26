import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Confirm } from '@/components/Confirm/Confirm';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { selectCategoryDeleting } from '@/features/category/categorySlice';
import { deleteCategory } from '@/features/category/categoryThunks';
import { CategoryEdit } from '@/features/category/components/CategoryEdit/CategoryEdit';
import { formatDate } from '@/lib/formatDate';
import type { Category } from '@/types/category';
import { TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface Props {
  category: Category;
}

export const CategoryCard: React.FC<Props> = ({ category }) => {
  const dispatch = useAppDispatch();
  const categoryDeleting = useAppSelector(selectCategoryDeleting);

  const handleDelete = async () => {
    await dispatch(deleteCategory(category._id)).unwrap();
  };

  return (
    <Card className={'p-3 shadow-none relative min-w-72 flex-1'}>
      <div className={'flex items-center gap-2 justify-between flex-col lg:flex-row flex-nowrap'}>
        <div>
          <h3>{category.name}</h3>
          <small className={'text-muted-foreground'}>
            Добавлено: {formatDate(category.createdAt, 'dd MMM yy, hh:mm')}
          </small>
        </div>

        <div className={'space-x-1 flex items-center'}>
          <Confirm onOk={handleDelete}>
            <Button size={'sm'} aria-label={'delete-category'}>
              <TrashIcon />
            </Button>
          </Confirm>

          <CategoryEdit id={category._id} />
        </div>
      </div>

      {categoryDeleting === category._id && (
        <div className={'w-full h-full absolute bg-zinc-950/20 top-0 left-0 rounded-xl'}>
          <Loader size={'sm'} absolute />
        </div>
      )}
    </Card>
  );
};
