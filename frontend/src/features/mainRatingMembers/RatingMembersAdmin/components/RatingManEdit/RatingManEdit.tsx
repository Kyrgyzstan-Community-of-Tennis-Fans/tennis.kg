import React, { useEffect, useMemo, useState } from 'react';
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
import { EditIcon } from 'lucide-react';
import { useAdminRatingMembers } from '@/features/mainRatingMembers/hooks/useAdminRatingMembers';

export interface Props {
  id: string;
  existingMember: RatingMember;
}

const RatingManEdit: React.FC<Props> = ({ id, existingMember }) => {
  const initialState = useMemo(
    () => ({
      ...existingMember,
      place: existingMember.place.toString(),
    }),
    [existingMember],
  );

  const dispatch = useAppDispatch();
  const [ratingMemberManMutation, setRatingMemberManMutation] = useState<RatingMemberMutation>(initialState);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const isUpdating = useAppSelector(selectRatingMemberUpdating);
  const { placesTop3, placesTop8 } = useAdminRatingMembers();

  useEffect(() => {
    if (open) {
      setRatingMemberManMutation(initialState);
    }
  }, [initialState, open, setRatingMemberManMutation]);

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setRatingMemberManMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeSelect = (value: string, name: string) => {
    setRatingMemberManMutation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRatingMemberManMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(updateRatingMember({ id, ratingMemberMutation: ratingMemberManMutation })).unwrap();
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
          <DialogTitle>Редактировать участника мужского рейтинга</DialogTitle>
        </DialogHeader>
        <form onSubmit={onFormSubmit}>
          <div className='flex flex-col gap-3 pt-3 pb-5'>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='name'>Имя</Label>
              <Input required id='name' name='name' value={ratingMemberManMutation.name} onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='ratingType'>Топ-8 или топ-3</Label>
              <Select
                required
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
            <div className='flex flex-col gap-1'>
              <Label htmlFor='image'>Фото</Label>
              <Input id='image' name='image' type='file' onChange={fileInputChangeHandler} />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <Button
              type='submit'
              disabled={
                isUpdating ||
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RatingManEdit;
