import { useTournaments } from '@/features/tournaments/hooks/useTournaments';
import RankFilter from '@/features/tournaments/components/RankFilter/RankFilter';
import TournamentAccordion from '@/features/tournaments/components/TournamentAccordion/TournamentAccordion';
import TournamentNew from '@/features/tournaments/components/TournamentNew/TournamentNew';
import { CURRENT_YEAR_FULL } from '@/consts';

const AdminCalendar = () => {
  const { tournaments, tournamentsFetching } = useTournaments();

  return (
    <div className='max-w-[900px] mx-auto mt-3'>
      <div className='flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'>
        <div>
          <h1 className='text-2xl font-medium leading-none mb-1'>Календарь</h1>
          <small className='text-muted-foreground text-base'>Управление турнирами</small>
        </div>
        <TournamentNew />
      </div>
      <div>
        <h1 className='mt-5 mb-10 font-semibold text-2xl md:text-3xl text-center'>Календарь ближайших турниров</h1>
        <div className='mb-8'>
          <RankFilter />
        </div>
        <TournamentAccordion
          tournaments={tournaments}
          isFetching={tournamentsFetching}
          currentYear={CURRENT_YEAR_FULL}
          isAdmin={true}
        />
      </div>
    </div>
  );
};

export default AdminCalendar;
