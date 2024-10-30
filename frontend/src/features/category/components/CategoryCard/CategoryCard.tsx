import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Confirm } from '@/components/Confirm/Confirm';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { selectCategoryDeleting } from '@/features/category/categorySlice';
import { deleteCategory } from '@/features/category/categoryThunks';
import { CategoryEdit } from '@/features/category/components/CategoryEdit/CategoryEdit';
import type { Category } from '@/types/categoryTypes';
import { TrashIcon } from '@heroicons/react/24/outline';

import React from 'react';
import { toast } from 'sonner';

interface Props {
  category: Category;
}

export const CategoryCard: React.FC<Props> = ({ category }) => {
  const dispatch = useAppDispatch();
  const categoryDeleting = useAppSelector(selectCategoryDeleting);

  const handleDelete = async () => {
    try {
      await dispatch(deleteCategory(category._id)).unwrap();
    } catch (error) {
      console.error(error);
      toast.error('Что-то пошло не так, попробуйте еще раз.');
    }
  };

  return (
    <Card className={'p-3 shadow-none min-w-40 relative flex-1'}>
      <div className={'flex items-center gap-2 justify-between flex-wrap flex-col lg:flex-row'}>
        <h3 className={'text-sm'}>{category.name}</h3>

        <div className={'space-x-1'}>
          <Confirm onOk={handleDelete}>
            <Button size={'sm'}>
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
