import {
  selectSelectedRank,
  selectTournaments,
  selectTournamentsFetching,
} from '@/features/tournaments/tournamentsSlice';
import { useEffect, useMemo } from 'react';
import { fetchTournaments } from '@/features/tournaments/tournamentsThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

export const useTournaments = () => {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector(selectTournaments);
  const tournamentsFetching = useAppSelector(selectTournamentsFetching);
  const selectedRank = useAppSelector(selectSelectedRank);

  const tournamentsLastYearExist = useMemo(() => {
    return Object.values(tournaments.previousYear).some((monthTournaments) => monthTournaments.length > 0);
  }, [tournaments.previousYear]);

  useEffect(() => {
    dispatch(fetchTournaments(selectedRank));
  }, [dispatch, selectedRank]);

  return { tournaments, tournamentsFetching, tournamentsLastYearExist };
};
