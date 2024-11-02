import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { selectCategories, selectCategoriesFetching } from '@/features/category/categorySlice';
import { fetchCategories } from '@/features/category/categoryThunks';
import { CategoryCard } from '@/features/category/components/CategoryCard/CategoryCard';
import { CategoryCreate } from '@/features/category/components/CategoryCreate/CategoryCreate';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';

export const Category: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (categoriesFetching) {
    return <Loader fixed />;
  }

  return (
    <>
      <section>
        <header className={'flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'}>
          <div>
            <h1 className={'text-lg font-medium leading-none'}>Категории</h1>
            <small className={'text-muted-foreground'}>Список всех категорий и управление категориями.</small>
          </div>

          <CategoryCreate categories={categories}>
            <Button className={'w-full xs:w-max'} size={'sm'}>
              Добавить категорию <SquaresPlusIcon />
            </Button>
          </CategoryCreate>
        </header>
        {!categoriesFetching && categories.length === 0 ? (
          <small className={'fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-muted-foreground'}>
            Категории не найдены.
            <CategoryCreate categories={categories}>
              <button className={'mx-1 underline underline-offset-2 hover:text-black'}>Добавьте категорию</button>
            </CategoryCreate>
          </small>
        ) : (
          <div className={'flex items-center gap-2 mt-3 flex-wrap'}>
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};
