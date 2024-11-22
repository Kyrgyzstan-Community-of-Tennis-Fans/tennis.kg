import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectRatingMembersCategoriesUpdating } from '@/features/mainRatingMembers/ratingMembersSlice';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useCategoriesForm } from '@/features/mainRatingMembers/hooks/useCategoriesForm';
import { fetchRatingMembers, updateRatingCategories } from '@/features/mainRatingMembers/ratingMembersThunks';
import { toast } from 'sonner';

interface Props {
  existingMensCategoryTop8: string;
  existingMensCategoryTop3: string;
  existingWomensCategoryTop3: string;
}

const RatingMembersCategoriesEdit: React.FC<Props> = ({
  existingMensCategoryTop8,
  existingMensCategoryTop3,
  existingWomensCategoryTop3,
}) => {
  const dispatch = useAppDispatch();
  const isUpdating = useAppSelector(selectRatingMembersCategoriesUpdating);
  const [open, setOpen] = useState(false);
  const { state, handleChange, resetForm } = useCategoriesForm({
    mensCategoryTop8: existingMensCategoryTop8,
    mensCategoryTop3: existingMensCategoryTop3,
    womensCategoryTop3: existingWomensCategoryTop3,
  });
  const isFormInvalid = isUpdating || !state.mensCategoryTop8 || !state.mensCategoryTop3 || !state.womensCategoryTop3;

  const handleOpen = () => {
    resetForm({
      mensCategoryTop8: existingMensCategoryTop8,
      mensCategoryTop3: existingMensCategoryTop3,
      womensCategoryTop3: existingWomensCategoryTop3,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(
        updateRatingCategories({
          mensRatingCategoryTop8: state.mensCategoryTop8,
          mensRatingCategoryTop3: state.mensCategoryTop3,
          womensRatingCategoryTop3: state.womensCategoryTop3,
        }),
      ).unwrap();
      await dispatch(fetchRatingMembers());
      toast.success('Категории рейтингов обновлены успешно');
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при обновлении категорий');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen} className='w-full xs:w-max'>
          Изменить категории <PencilSquareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Редактировать категории рейтинга</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3 pt-3 pb-5'>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='mensCategoryTop8'>Мужская категория для топ-8</Label>
              <Input
                required
                id='mensCategoryTop8'
                name='mensCategoryTop8'
                placeholder='Введите категорию для мужского топ-8'
                value={state.mensCategoryTop8}
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-1'>
              <Label htmlFor='mensCategoryTop3'>Мужская категория для топ-3</Label>
              <Input
                required
                id='mensCategoryTop3'
                name='mensCategoryTop3'
                placeholder='Введите категорию для мужского топ-3'
                value={state.mensCategoryTop3}
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-1'>
              <Label htmlFor='womensCategoryTop3'>Женская категория для топ-3</Label>
              <Input
                required
                id='womensCategoryTop3'
                name='womensCategoryTop3'
                placeholder='Введите категорию для женского топ-3'
                value={state.womensCategoryTop3}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <Button type='submit' disabled={isFormInvalid}>
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

export default RatingMembersCategoriesEdit;
