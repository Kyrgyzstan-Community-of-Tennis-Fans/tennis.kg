import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RatingMember, RatingMemberMutation } from '@/types/ratingMemberTypes';
import { selectRatingMemberUpdating } from '@/features/mainRatingMembers/ratingMembersSlice';
import { fetchRatingMembers, updateRatingMember } from '@/features/mainRatingMembers/ratingMembersThunks';
import { toast } from 'sonner';
import { GlobalError } from '@/types/userTypes';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileInput from '@/features/mainRatingMembers/RatingMembersAdmin/components/FileInput/FileInput';
import { EditIcon } from 'lucide-react';

export interface Props {
  id: string;
  existingMember: RatingMember;
}

const RatingWomanEdit: React.FC<Props> = ({ id, existingMember }) => {
  const initialState: RatingMemberMutation = existingMember && {
    ...existingMember,
    place: existingMember.place.toString(),
  };
  const dispatch = useAppDispatch();
  const isUpdating = useAppSelector(selectRatingMemberUpdating);
  const [open, setOpen] = useState(false);
  const [ratingMemberWomanMutation, setRatingMemberWomanMutation] = useState<RatingMemberMutation>(initialState);
  const places = Array.from({ length: 3 }, (_, i) => (i + 1).toString());
  const handleClose = () => setOpen(false);

  const handleChangeSelect = (value: string, name: string) => {
    setRatingMemberWomanMutation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRatingMemberWomanMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
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
      await dispatch(updateRatingMember({ id, ratingMemberMutation: ratingMemberWomanMutation })).unwrap();
      await dispatch(fetchRatingMembers());
      handleClose();
      toast.success('Участник рейтинга обновлен успешно');
    } catch (error) {
      handleClose();
      const backendError = error as GlobalError;
      toast.error(backendError.error || 'Что-то пошло не так при обновлении!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Редактировать участника женского рейтинга</DialogTitle>
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
                isUpdating || ratingMemberWomanMutation.place === '' || ratingMemberWomanMutation.image === null
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

export default RatingWomanEdit;
