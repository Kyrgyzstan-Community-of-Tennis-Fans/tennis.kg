import { deleteTournament, fetchTournaments } from '@/features/tournaments/tournamentsThunks';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectTournamentDeleting } from '@/features/tournaments/tournamentsSlice';

export const useAdminTournaments = () => {
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(selectTournamentDeleting);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTournament(id)).unwrap();
      await dispatch(fetchTournaments());
      toast.success('Удаление прошло успешно!');
    } catch (error) {
      console.error(error);
      toast.error('Что-то пошло не так!');
    }
  };

  return { isDeleting, handleDelete };
};
