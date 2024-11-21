import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { useAdminRatingMembers } from '@/features/mainRatingMembers/hooks/useAdminRatingMembers';
import { RatingMember, RatingMemberMutation } from '@/types/ratingMember';
import { useFormHandlers } from '@/features/mainRatingMembers/hooks/useFormHandlers';

interface Props {
  forWhichGender: 'male' | 'female';
  onSubmit: (ratingMember: RatingMemberMutation) => void;
  existingMember?: RatingMember;
  isLoading?: boolean;
  onClose?: () => void;
  open: boolean;
}

const emptyState: RatingMemberMutation = {
  name: '',
  image: null,
  gender: '',
  place: '',
  ratingType: '',
};

const RatingMemberForm: React.FC<Props> = ({ forWhichGender, onSubmit, existingMember, isLoading, onClose, open }) => {
  const initialState = existingMember
    ? { ...existingMember, place: existingMember.place.toString() }
    : {
        ...emptyState,
        gender: forWhichGender,
        ratingType: forWhichGender === 'female' ? 'womensTop3' : ('' as '' | 'mensTop8' | 'mensTop3' | 'womensTop3'),
      };

  const [state, setState] = useState<RatingMemberMutation>(initialState);
  const { placesTop3, placesTop8 } = useAdminRatingMembers();

  useEffect(() => {
    if (open) {
      setState((prevState) => ({
        ...prevState,
        gender: forWhichGender,
        ratingType: forWhichGender === 'female' ? 'womensTop3' : prevState.ratingType,
      }));
    }
  }, [open, forWhichGender]);

  const { handleChange, handleChangeSelect, fileInputChangeHandler } = useFormHandlers(setState);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      ...state,
    });

    setState(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-3 pt-3 pb-5'>
        <div className='flex flex-col gap-1'>
          <Label htmlFor='name'>Имя</Label>
          <Input required id='name' name='name' value={state.name} onChange={handleChange} />
        </div>
        {forWhichGender === 'male' && (
          <div className='flex flex-col gap-1'>
            <Label htmlFor='ratingType'>Топ</Label>
            <Select
              name='ratingType'
              value={state.ratingType}
              onValueChange={(value) => handleChangeSelect(value, 'ratingType')}
            >
              <SelectTrigger id='place'>
                <SelectValue placeholder='Укажите в какой топ' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='mensTop8'>Топ-8</SelectItem>
                  <SelectItem value='mensTop3'>Топ-3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='place'>Место</Label>
          <Select
            required
            name='place'
            value={state.place}
            onValueChange={(value) => handleChangeSelect(value, 'place')}
            disabled={forWhichGender === 'male' && !state.ratingType}
          >
            <SelectTrigger id='place'>
              <SelectValue placeholder='Укажите место' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {forWhichGender === 'male' && state.ratingType === 'mensTop8'
                  ? placesTop8.map((place) => (
                      <SelectItem key={place} value={place}>
                        {place}
                      </SelectItem>
                    ))
                  : placesTop3.map((place) => (
                      <SelectItem key={place} value={place}>
                        {place}
                      </SelectItem>
                    ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {forWhichGender === 'male' && !state.ratingType && (
            <small className='text-red-500'>Сначала выберите топ</small>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <Label htmlFor='image'>Фото</Label>
          <Input id='image' name='image' type='file' onChange={fileInputChangeHandler} />
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <Button type='submit' disabled={isLoading || state.place === '' || state.image === null}>
          Сохранить
        </Button>
        <DialogClose asChild>
          <Button type='button' variant='secondary' onClick={onClose}>
            Отмена
          </Button>
        </DialogClose>
      </div>
    </form>
  );
};

export default RatingMemberForm;
