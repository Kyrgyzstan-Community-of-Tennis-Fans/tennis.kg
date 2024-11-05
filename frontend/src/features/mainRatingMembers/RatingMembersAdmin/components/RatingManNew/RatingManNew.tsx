import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RatingMemberMutation } from '@/types/ratingMemberTypes';
import { selectRatingMemberCreating } from '@/features/mainRatingMembers/ratingMembersSlice';
import { createRatingMember, fetchRatingMembers } from '@/features/mainRatingMembers/ratingMembersThunks';
import { toast } from 'sonner';
import { GlobalError } from '@/types/userTypes';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileInput from '@/features/mainRatingMembers/RatingMembersAdmin/components/FileInput/FileInput';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';

const emptyState: RatingMemberMutation = {
  name: '',
  image: null,
  gender: 'male',
  place: '',
  ratingType: '',
};

const RatingManNew = () => {
  const dispatch = useAppDispatch();
  const [ratingMemberManMutation, setRatingMemberManMutation] = useState<RatingMemberMutation>(emptyState);
  const isCreating = useAppSelector(selectRatingMemberCreating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const placesTop8 = Array.from({ length: 8 }, (_, i) => (i + 1).toString());
  const placesTop3 = Array.from({ length: 3 }, (_, i) => (i + 1).toString());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRatingMemberManMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeSelect = (value: string, name: string) => {
    setRatingMemberManMutation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setRatingMemberManMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(createRatingMember(ratingMemberManMutation)).unwrap();
      await dispatch(fetchRatingMembers());
      handleClose();
      setRatingMemberManMutation(emptyState);
      toast.success('Участник рейтинга создан успешно');
    } catch (error) {
      handleClose();
      setRatingMemberManMutation(emptyState);
      const backendError = error as GlobalError;
      toast.error(backendError.error || 'Что-то пошло не так при создании!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>
          Добавить в мужской рейтинг <SquaresPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Добавить участника мужского рейтинга</DialogTitle>
        </DialogHeader>
        <form onSubmit={onFormSubmit}>
          <div className='flex flex-col gap-3 pt-3 pb-5'>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='name'>Имя</Label>
              <Input required id='name' name='name' value={ratingMemberManMutation.name} onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='ratingType'>Топ</Label>
              <Select
                name='ratingType'
                value={ratingMemberManMutation.ratingType}
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
            {(ratingMemberManMutation.ratingType === 'mensTop8' ||
              ratingMemberManMutation.ratingType === 'mensTop3') && (
              <div className='flex flex-col gap-1'>
                <Label htmlFor='place'>Место</Label>
                <Select
                  required
                  name='place'
                  value={ratingMemberManMutation.place}
                  onValueChange={(value) => handleChangeSelect(value, 'place')}
                >
                  <SelectTrigger id='place'>
                    <SelectValue placeholder='Укажите место' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ratingMemberManMutation.ratingType === 'mensTop8'
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
              </div>
            )}
            <div className='flex flex-col gap-1'>
              <Label htmlFor='image'>Фото</Label>
              <FileInput name='image' onChange={fileInputChangeHandler} />
            </div>
          </div>
          <DialogFooter className='gap-3'>
            <Button
              type='submit'
              disabled={
                isCreating ||
                ratingMemberManMutation.ratingType === '' ||
                ratingMemberManMutation.place === '' ||
                ratingMemberManMutation.image === null
              }
            >
              Сохранить
            </Button>
            <DialogClose asChild>
              <Button type='button' variant='secondary' onClick={handleClose}>
                Отмена
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RatingManNew;
