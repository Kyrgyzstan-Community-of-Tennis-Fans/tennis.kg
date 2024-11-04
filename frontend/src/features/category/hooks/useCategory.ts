import {useAppDispatch, useAppSelector} from '@/app/hooks';
import {selectCategories, selectCategoriesFetching} from '@/features/category/categorySlice';
import {useEffect} from 'react';
import {fetchCategories} from '@/features/category/categoryThunks';

export const useCategory = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  
  return { categories, categoriesFetching };
};