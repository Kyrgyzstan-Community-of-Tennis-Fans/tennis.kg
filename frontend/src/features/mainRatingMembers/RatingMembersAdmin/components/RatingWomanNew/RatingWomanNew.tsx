import React, { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectRatingMemberCreating } from '@/features/mainRatingMembers/ratingMembersSlice';
import { RatingMemberMutation } from '@/types/ratingMemberTypes';
import { createRatingMember, fetchRatingMembers } from '@/features/mainRatingMembers/ratingMembersThunks';
import { toast } from 'sonner';
import { GlobalError } from '@/types/userTypes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileInput from '@/components/FileInput/FileInput';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';

const emptyState: RatingMemberMutation = {
  name: '',
  image: null,
  gender: 'female',
  place: '',
  ratingType: 'womensTop3',
};

const RatingWomanNew = () => {
  const dispatch = useAppDispatch();
  const [ratingMemberWomanMutation, setRatingMemberWomanMutation] = useState<RatingMemberMutation>(emptyState);
  const isCreating = useAppSelector(selectRatingMemberCreating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const places = Array.from({ length: 3 }, (_, i) => (i + 1).toString());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRatingMemberWomanMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeSelect = (value: string, name: string) => {
    setRatingMemberWomanMutation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setRatingMemberWomanMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(createRatingMember(ratingMemberWomanMutation)).unwrap();
      await dispatch(fetchRatingMembers());
      handleClose();
      setRatingMemberWomanMutation(emptyState);
      toast.success('Участник рейтинга создан успешно');
    } catch (error) {
      handleClose();
      setRatingMemberWomanMutation(emptyState);
      const backendError = error as GlobalError;
      toast.error(backendError.error || 'Что-то пошло не так при создании!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>
          Добавить в женский рейтинг <SquaresPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Добавить участника женского рейтинга</DialogTitle>
        </DialogHeader>
        <form onSubmit={onFormSubmit}>
          <div className='flex flex-col gap-3 pt-3 pb-5'>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='name'>Имя</Label>
              <Input required id='name' name='name' value={ratingMemberWomanMutation.name} onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='place'>Место</Label>
              <Select
                required
                name='place'
                value={ratingMemberWomanMutation.place}
                onValueChange={(value) => handleChangeSelect(value, 'place')}
              >
                <SelectTrigger id='place'>
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
            <div className='flex flex-col gap-1'>
              <Label htmlFor='image'>Фото</Label>
              <FileInput name='image' onChange={fileInputChangeHandler} />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <Button
              type='submit'
              disabled={
                isCreating || ratingMemberWomanMutation.place === '' || ratingMemberWomanMutation.image === null
              }
            >
              Сохранить
            </Button>
            <DialogClose asChild>
              <Button type='button' variant='secondary' onClick={handleClose}>
                Отмена
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RatingWomanNew;
