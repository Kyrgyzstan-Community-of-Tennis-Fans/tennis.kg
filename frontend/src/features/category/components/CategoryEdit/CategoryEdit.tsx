import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  selectCategories,
  selectCategory,
  selectCategoryFetching,
  selectCategoryUpdating,
} from '@/features/category/categorySlice';
import { fetchCategories, fetchCategory, updateCategory } from '@/features/category/categoryThunks';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import React, { type FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  id: string;
}

export const CategoryEdit: React.FC<Props> = ({ id }) => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const categoryUpdating = useAppSelector(selectCategoryUpdating);
  const category = useAppSelector(selectCategory);
  const categoryFetching = useAppSelector(selectCategoryFetching);
  const [categoryMutation, setCategoryMutation] = useState<string>('');
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const blockedWords = categories
    .filter((category) => category._id !== id)
    .map((category) => category.name.toLowerCase());
  const isBlocked = blockedWords.includes(categoryMutation.toLowerCase());

  useEffect(() => {
    if (open) {
      dispatch(fetchCategory(id));
    }
  }, [dispatch, id, open]);

  useEffect(() => {
    if (open && category) {
      setCategoryMutation(category.name);
    }
  }, [category, open]);

  useEffect(() => {
    if (!open) {
      setCategoryMutation('');
    }
  }, [open]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCategoryMutation(value);
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      await dispatch(updateCategory({ id, name: categoryMutation })).unwrap();
      await dispatch(fetchCategories());
      closeRef.current?.click();
      toast.success('Категория успешно отредактирована.');
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при редактировании категории.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <PencilSquareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать категорию</DialogTitle>
          <DialogDescription>Заполните форму перед изменением.</DialogDescription>

          {categoryFetching ? (
            <div className={'space-y-2'}>
              <Skeleton className={'w-full h-6'} />
              <Skeleton className={'w-full h-6'} />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={'mb-2 text-left'}>
                <div className={'flex items-center justify-between gap-2 mb-1'}>
                  <Label htmlFor={'category'}>Название</Label>
                  {isBlocked && (
                    <small className={'text-red-600 leading-none'}>Категория {categoryMutation} уже существует.</small>
                  )}
                </div>
                <Input
                  placeholder={'Введите название категории'}
                  id={'category'}
                  onChange={handleChange}
                  value={categoryMutation}
                />
              </div>

              <div className={'flex flex-col gap-1'}>
                <Button disabled={categoryUpdating || categoryMutation.length === 0 || isBlocked} size={'sm'}>
                  Сохранить {categoryUpdating && <Loader size={'sm'} theme={'light'} />}
                </Button>
                <DialogClose ref={closeRef} asChild>
                  <Button disabled={categoryUpdating} type={'button'} variant={'outline'}>
                    Отменить
                  </Button>
                </DialogClose>
              </div>
            </form>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
