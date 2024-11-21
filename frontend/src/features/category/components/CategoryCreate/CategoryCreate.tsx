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
import { selectCategoryCreating } from '@/features/category/categorySlice';
import { createCategory } from '@/features/category/categoryThunks';
import type { Category } from '@/types/category';
import React, { type FormEvent, type PropsWithChildren, useRef, useState } from 'react';
import { toast } from 'sonner';

interface Props extends PropsWithChildren {
  categories: Category[];
}

export const CategoryCreate: React.FC<Props> = ({ categories, children }) => {
  const dispatch = useAppDispatch();
  const categoryCreating = useAppSelector(selectCategoryCreating);
  const [category, setCategory] = useState<string>('');
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const blockedWords = categories.map((category) => category.name.toLowerCase());
  const isBlocked = blockedWords.includes(category.toLowerCase());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCategory(value);
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      closeRef.current?.click();
      await dispatch(createCategory(category)).unwrap();
      setCategory('');
      toast.success('Категория успешно добавлена.');
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при добавлении категории.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить категорию</DialogTitle>
          <DialogDescription>Заполните форму перед добавлением.</DialogDescription>

          <form onSubmit={handleSubmit}>
            <div className={'mb-2 text-left'}>
              <div className={'flex items-center justify-between gap-2 mb-1'}>
                <Label htmlFor={'category'}>Название</Label>
                {isBlocked && (
                  <small className={'text-red-600 leading-none'}>Категория {category} уже существует.</small>
                )}
              </div>
              <Input
                placeholder={'Введите название категории'}
                id={'category'}
                onChange={handleChange}
                value={category}
              />
            </div>

            <div className={'flex flex-col gap-1'}>
              <Button disabled={categoryCreating || category.length === 0 || isBlocked} size={'sm'}>
                Добавить {categoryCreating && <Loader size={'sm'} theme={'light'} />}
              </Button>
              <DialogClose ref={closeRef} asChild>
                <Button disabled={categoryCreating} type={'button'} variant={'outline'}>
                  Отменить
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
