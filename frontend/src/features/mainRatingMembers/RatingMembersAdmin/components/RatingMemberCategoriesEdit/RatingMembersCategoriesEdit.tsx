import React, { useEffect, useState } from 'react';
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
import { fetchCategories } from '@/features/category/categoryThunks';
import { selectCategories } from '@/features/category/categorySlice';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RatingMembersCategoriesEditProps {
  existingMensCategory: string;
  existingWomensCategory: string;
}

const RatingMembersCategoriesEdit: React.FC<RatingMembersCategoriesEditProps> = ({
  existingMensCategory,
  existingWomensCategory,
}) => {
  const dispatch = useAppDispatch();
  const isUpdating = useAppSelector(selectRatingMembersCategoriesUpdating);
  const [open, setOpen] = useState(false);
  const [mensCategory, setMensCategory] = useState(existingMensCategory);
  const [womensCategory, setWomensCategory] = useState(existingWomensCategory);
  const categories = useAppSelector(selectCategories);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(
        updateRatingCategories({ mensRatingCategory: mensCategory, womensRatingCategory: womensCategory }),
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

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
          <div className='grid gap-3 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='menCategory' className='text-right'>
                Мужская категория
              </Label>
              <Select
                required
                name='menCategory'
                value={mensCategory}
                onValueChange={(value) => setMensCategory(value)}
              >
                <SelectTrigger id='menCategory' className='col-span-3'>
                  <SelectValue placeholder='Выберите категорию' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='womenCategory' className='text-right'>
                Женская категория
              </Label>
              <Select
                required
                name='womenCategory'
                value={womensCategory}
                onValueChange={(value) => setWomensCategory(value)}
              >
                <SelectTrigger id='womenCategory' className='col-span-3'>
                  <SelectValue placeholder='Выберите категорию' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className='gap-3'>
            <Button type='submit' disabled={isUpdating}>
              Сохранить
            </Button>
            <DialogClose asChild>
              <Button type='button' variant='secondary' onClick={() => setOpen(false)}>
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
