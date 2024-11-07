import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { selectCategories, selectCategoriesFetching } from '@/features/category/categorySlice';
import { fetchCategories } from '@/features/category/categoryThunks';
import { getMonth } from '@/lib/getMonth';
import type { EventMutation } from '@/types/eventTypes';
import type { Rating } from '@/types/ratingTypes';
import React, { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';

interface Props {
  onSubmit: (eventMutation: EventMutation) => void;
  ratings: Rating[];
}

const initialState: EventMutation = {
  rating: '',
  category: '',
  gender: 'male',
  link: '',
};

export const EventForm: React.FC<Props> = ({ onSubmit, ratings }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);
  const [eventMutation, setEventMutation] = useState<EventMutation>(initialState);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setEventMutation({ ...eventMutation, [id]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ ...eventMutation });
    setEventMutation(initialState);
  };

  const handleSelectChange = (v: string, id: string) => {
    setEventMutation({ ...eventMutation, [id]: v });
  };

  const isFormValid = eventMutation.rating && eventMutation.category && eventMutation.link && eventMutation.gender;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor={'category'}>Категория</Label>
        <Select value={eventMutation.category} onValueChange={(v) => handleSelectChange(v, 'category')}>
          <SelectTrigger id={'category'}>
            <SelectValue placeholder={'Выберите категорию'} />
          </SelectTrigger>
          <SelectContent>
            {categoriesFetching ? (
              <SelectItem value={'null'} disabled>
                Загрузка…
              </SelectItem>
            ) : (
              categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor={'rating'}>Рейтинг</Label>
        <Select value={eventMutation.rating} onValueChange={(v) => handleSelectChange(v, 'rating')}>
          <SelectTrigger id={'rating'}>
            <SelectValue placeholder={'Выберите рейтинг'} />
          </SelectTrigger>
          <SelectContent>
            {ratings.map((rating) => (
              <SelectItem key={rating._id} value={rating._id}>
                {getMonth(rating.month)} {rating.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor={'gender'}>Пол</Label>
        <Select value={eventMutation.gender} onValueChange={(v) => handleSelectChange(v, 'gender')}>
          <SelectTrigger id={'gender'}>
            <SelectValue placeholder={'Выберите пол'} />
          </SelectTrigger>
          <SelectContent>
            {['male', 'female'].map((item) => (
              <SelectItem key={item} value={item}>
                {item === 'male' ? 'Мужской' : 'Женский'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor={'link'}>Ссылка</Label>
        <Input
          id={'link'}
          placeholder={'Введите ссылку'}
          type={'url'}
          onChange={handleChange}
          value={eventMutation.link}
        />
      </div>

      <Button disabled={!isFormValid} className={'mt-3 w-full'} type={'submit'}>
        Создать
      </Button>
    </form>
  );
};
