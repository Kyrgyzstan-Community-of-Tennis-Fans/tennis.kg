import { selectTournaments, selectTournamentsFetching } from '@/features/tournaments/tournamentsSlice';
import { useEffect } from 'react';
import { fetchTournaments } from '@/features/tournaments/tournamentsThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

export const useTournaments = () => {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector(selectTournaments);
  const tournamentsFetching = useAppSelector(selectTournamentsFetching);

  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);

  return { tournaments, tournamentsFetching };
};
