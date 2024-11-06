import { Layout } from '@/components/Layout';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/features/category/components/CategoryCard/CategoryCard';
import { CategoryCreate } from '@/features/category/components/CategoryCreate/CategoryCreate';
import { useCategory } from '@/features/category/hooks/useCategory';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const Category: React.FC = () => {
  const { categories, categoriesFetching } = useCategory();

  if (categoriesFetching) return <Loader fixed />;

  return (
    <Layout>
      <header className={'flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'}>
        <div>
          <h1 className={'text-2xl font-medium leading-none'}>Категории</h1>
          <small className={'text-muted-foreground text-base'}>Список всех категорий и управление категориями.</small>
        </div>

        <CategoryCreate categories={categories}>
          <Button className={'w-full xs:w-max'}>
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
    </Layout>
  );
};
