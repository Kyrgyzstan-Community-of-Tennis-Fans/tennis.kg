import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { selectCategories, selectCategoriesFetching } from '@/features/category/categorySlice';
import { fetchCategories } from '@/features/category/categoryThunks';
import { CategoryCard } from '@/features/category/components/CategoryCard/CategoryCard';
import { CategoryCreate } from '@/features/category/components/CategoryCreate/CategoryCreate';
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
      {!categoriesFetching && categories.length === 0 ? (
        <small>Категории не найдены. Добавьте категорию.</small>
      ) : (
        <section>
          <header className={'flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'}>
            <div>
              <h1 className={'text-lg font-medium leading-none'}>Категории</h1>
              <small className={'text-muted-foreground'}>Список всех категорий и управление категориями.</small>
            </div>

            <CategoryCreate categories={categories} />
          </header>
          <div className={'flex items-center gap-2 mt-3 flex-wrap'}>
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};