import {
  selectSelectedRank,
  selectTournamentDeleting,
  selectTournaments,
  selectTournamentsFetching,
} from '@/features/tournaments/tournamentsSlice';
import { useEffect } from 'react';
import { deleteTournament, fetchTournaments } from '@/features/tournaments/tournamentsThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toast } from 'sonner';

export const useTournaments = () => {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector(selectTournaments);
  const tournamentsFetching = useAppSelector(selectTournamentsFetching);
  const selectedRank = useAppSelector(selectSelectedRank);
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

  useEffect(() => {
    dispatch(fetchTournaments(selectedRank));
  }, [dispatch, selectedRank]);

  return { tournaments, tournamentsFetching, isDeleting, handleDelete };
};
