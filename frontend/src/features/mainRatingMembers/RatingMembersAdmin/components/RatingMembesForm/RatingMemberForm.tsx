import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RatingMember, RatingMemberMutation } from '@/types/ratingMemberTypes';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileInput from '@/features/mainRatingMembers/RatingMembersAdmin/components/FileInput/FileInput';

interface Props {
  onSubmit: (ratingMember: RatingMemberMutation) => void;
  existingMember?: RatingMember;
  isLoading?: boolean;
  onClose?: () => void;
}

const emptyState: RatingMemberMutation = {
  name: '',
  image: null,
  gender: '',
  place: '',
};

const RatingMemberForm: React.FC<Props> = ({ onSubmit, existingMember, isLoading, onClose }) => {
  const initialState: RatingMemberMutation = existingMember
    ? { ...existingMember, place: existingMember.place.toString() }
    : emptyState;
  const [ratingMemberMutation, setRatingMemberMutation] = useState<RatingMemberMutation>(initialState);
  const places = Array.from({ length: 8 }, (_, i) => (i + 1).toString());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRatingMemberMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      ...ratingMemberMutation,
    });

    setRatingMemberMutation(initialState);
  };

  const handleChangeSelect = (value: string, name: string) => {
    setRatingMemberMutation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setRatingMemberMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='grid gap-3 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Имя
          </Label>
          <Input
            required
            id='name'
            name='name'
            value={ratingMemberMutation.name}
            onChange={handleChange}
            className='col-span-3'
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='place' className='text-right'>
            Место
          </Label>
          <Select
            required
            name='place'
            value={ratingMemberMutation.place}
            onValueChange={(value) => handleChangeSelect(value, 'place')}
          >
            <SelectTrigger id='place' className='col-span-3'>
              <SelectValue placeholder='Укажите место' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {places.map((place) => (
                  <SelectItem key={place} value={place}>
                    {place}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='gender' className='text-right'>
            Пол
          </Label>
          <Select
            required
            name='gender'
            value={ratingMemberMutation.gender}
            onValueChange={(value) => handleChangeSelect(value, 'gender')}
          >
            <SelectTrigger id='gender' className='col-span-3'>
              <SelectValue placeholder='Укажите пол' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='male'>Мужской</SelectItem>
                <SelectItem value='female'>Женский</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='image' className='text-right'>
            Фото
          </Label>
          <FileInput name='image' onChange={fileInputChangeHandler} />
        </div>
      </div>
      <DialogFooter className='gap-3'>
        <Button type='submit' disabled={isLoading}>
          Сохранить
        </Button>
        <DialogClose asChild>
          <Button type='button' variant='secondary' onClick={onClose}>
            Отмена
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
};

export default RatingMemberForm;
