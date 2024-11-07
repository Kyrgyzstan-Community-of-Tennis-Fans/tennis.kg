import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchCategories } from '@/features/category/categoryThunks';
import { selectRatingsCreating } from '@/features/ratings/ratingsSlice';
import type { RatingMutation } from '@/types/ratingTypes';
import React, { type ChangeEvent, type FormEvent, useEffect } from 'react';

interface Props {
  onSubmit: (rating: RatingMutation) => void;
}

const initialState: RatingMutation = {
  year: '',
  month: '',
};

export const RatingForm: React.FC<Props> = ({ onSubmit }) => {
  const [ratingMutation, setRatingMutation] = React.useState<RatingMutation>(initialState);
  const dispatch = useAppDispatch();
  const ratingsCreating = useAppSelector(selectRatingsCreating);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const year = Number(value);

    if (value.length > 4 || isNaN(year)) return;

    if (year > new Date().getFullYear()) return;

    setRatingMutation((prev) => ({
      ...prev,
      year: value,
    }));
  };

  const handleMonthChange = (value: string) => {
    setRatingMutation((prev) => ({
      ...prev,
      month: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ ...ratingMutation });
  };

  const isFormValid = ratingMutation.year.length === 4 && ratingMutation.month !== '';

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
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor={'month'}>Месяц</Label>
        <Select value={ratingMutation.month} onValueChange={handleMonthChange}>
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
        <Input id={'year'} placeholder={'Введите год'} onChange={handleYearChange} value={ratingMutation.year} />
      </div>

      <Button disabled={!isFormValid || ratingsCreating} className={'w-full mt-4'} size={'sm'}>
        Добавить {ratingsCreating && <Loader theme={'light'} />}
      </Button>
    </form>
  );
};
