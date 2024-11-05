import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { selectCategories, selectCategoriesFetching } from '@/features/category/categorySlice';
import { fetchCategories } from '@/features/category/categoryThunks';
import type { RatingMutation } from '@/types/ratingTypes';
import React, { type ChangeEvent, useEffect } from 'react';
import { toast } from 'sonner';

const initialState: RatingMutation = {
  category: '',
  gender: 'male',
  link: '',
  month: '',
  year: '',
};

export const RatingForm: React.FC = () => {
  const [ratingMutation, setRatingMutation] = React.useState<RatingMutation>(initialState);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === 'year') {
      const yearRegex = /^20(0[0-9]|1[0-9]|2[0-4])?$/;
      if (value.length === 5 && !yearRegex.test(value)) {
        return;
      }
    }

    setRatingMutation((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (value: string, id: string) => {
    setRatingMutation((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const months = [
    {
      name: 'Январь',
      value: 'january',
    },
    {
      name: 'Февраль',
      value: 'february',
    },
    {
      name: 'Март',
      value: 'march',
    },
    {
      name: 'Апрель',
      value: 'april',
    },
    {
      name: 'Май',
      value: 'may',
    },
    {
      name: 'Июнь',
      value: 'june',
    },
    {
      name: 'Июль',
      value: 'july',
    },
    {
      name: 'Август',
      value: 'august',
    },
    {
      name: 'Сентябрь',
      value: 'september',
    },
    {
      name: 'Октябрь',
      value: 'october',
    },
    {
      name: 'Ноябрь',
      value: 'november',
    },
    {
      name: 'Декабрь',
      value: 'december',
    },
  ];

  return (
    <form>
      <div>
        <Label htmlFor={'category'}>Категория</Label>
        <Select value={ratingMutation.category} onValueChange={(v) => handleSelectChange(v, 'category')}>
          <SelectTrigger id={'category'}>
            <SelectValue placeholder={'Выберите категорию'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categoriesFetching ? (
                <SelectItem value={'null'} disabled>
                  Загрузка...
                </SelectItem>
              ) : (
                categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor={'month'}>Месяц</Label>
        <Select value={ratingMutation.month} onValueChange={(v) => handleSelectChange(v, 'month')}>
          <SelectTrigger id={'month'} className={'capitalize'}>
            <SelectValue placeholder={'Выберите месяц'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {months.map((month) => (
                <SelectItem className={'capitalize'} key={month.value} value={month.value}>
                  {month.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor={'year'}>Год</Label>
        <Input id={'year'} placeholder={'Введите год'} onChange={handleChange} value={ratingMutation.year} />
      </div>
    </form>
  );
};
