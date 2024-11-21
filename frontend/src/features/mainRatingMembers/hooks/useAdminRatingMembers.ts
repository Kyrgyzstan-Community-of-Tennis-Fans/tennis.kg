import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deleteRatingMember, fetchRatingMembers } from '@/features/mainRatingMembers/ratingMembersThunks';
import { toast } from 'sonner';
import { selectCategoryDeleting } from '@/features/category/categorySlice';

export const useAdminRatingMembers = () => {
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(selectCategoryDeleting);
  const placesTop8 = Array.from({ length: 8 }, (_, i) => (i + 1).toString());
  const placesTop3 = Array.from({ length: 3 }, (_, i) => (i + 1).toString());

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteRatingMember(id)).unwrap();
      await dispatch(fetchRatingMembers());
      toast.success('Удаление прошло успешно!');
    } catch (error) {
      console.error(error);
      toast.error('Что-то пошло не так!');
    }
  };

  return { handleDelete, isDeleting, placesTop8, placesTop3 };
};
