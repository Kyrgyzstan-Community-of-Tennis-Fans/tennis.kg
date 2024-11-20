import { useTournaments } from '@/features/tournaments/hooks/useTournaments';
import TournamentCalendar from '@/features/tournaments/components/TournamentCalendar/TournamentCalendar';

const Calendar = () => {
  const { tournaments, tournamentsFetching } = useTournaments();

  return <TournamentCalendar tournaments={tournaments} isFetching={tournamentsFetching} />;
};

export default Calendar;
