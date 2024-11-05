import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectRatingMembersCategoriesUpdating } from '@/features/mainRatingMembers/ratingMembersSlice';
import { toast } from 'sonner';
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
import { fetchRatingMembers, updateRatingCategories } from '@/features/mainRatingMembers/ratingMembersThunks';
import { EditIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
  const [mensCategoryTop8, setMensCategoryTop8] = useState(existingMensCategoryTop8);
  const [mensCategoryTop3, setMensCategoryTop3] = useState(existingMensCategoryTop3);
  const [womensCategoryTop3, setWomensCategoryTop3] = useState(existingWomensCategoryTop3);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(
        updateRatingCategories({
          mensRatingCategoryTop8: mensCategoryTop8,
          mensRatingCategoryTop3: mensCategoryTop3,
          womensRatingCategoryTop3: womensCategoryTop3,
        }),
      ).unwrap();
      await dispatch(fetchRatingMembers());
      toast.success('Категории рейтингов обновлены успешно');
      handleClose();
    } catch (error) {
      console.error(error);
      handleClose();
      toast.error('Ошибка при обновлении категорий');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>
          Изменить категории <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Редактировать категории рейтинга</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3 pt-3 pb-5'>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='menCategory'>Мужская категория для топ-8</Label>
              <Input
                required
                id='mensCategoryTop8'
                name='mensCategoryTop8'
                value={mensCategoryTop8}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMensCategoryTop8(event.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='menCategory'>Мужская категория для топ-3</Label>
              <Input
                required
                id='mensCategoryTop3'
                name='mensCategoryTop3'
                value={mensCategoryTop3}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMensCategoryTop3(event.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='womenCategory'>Женская категория для топ-3</Label>
              <Input
                required
                id='womensCategoryTop3'
                name='womensCategoryTop3'
                value={womensCategoryTop3}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setWomensCategoryTop3(event.target.value)}
              />
            </div>
          </div>
          <DialogFooter className='gap-3'>
            <Button type='submit' disabled={isUpdating}>
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

export default RatingMembersCategoriesEdit;
