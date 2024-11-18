import { useTournaments } from '@/features/tournaments/hooks/useTournaments';
import TournamentNew from '@/features/tournaments/components/TournamentNew/TournamentNew';
import TournamentCalendar from '@/features/tournaments/components/TournamentCalendar/TournamentCalendar';

const AdminCalendar = () => {
  const { tournaments, tournamentsFetching } = useTournaments();

  return (
    <div className='max-w-[900px] mx-auto mt-3'>
      <div className='flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5 mb-5'>
        <div>
          <h1 className='text-2xl font-medium leading-none mb-1'>Календарь</h1>
          <small className='text-muted-foreground text-base'>Управление турнирами</small>
        </div>
        <TournamentNew />
      </div>
      <TournamentCalendar tournaments={tournaments} isFetching={tournamentsFetching} isAdmin={true} />
    </div>
  );
};

export default AdminCalendar;
