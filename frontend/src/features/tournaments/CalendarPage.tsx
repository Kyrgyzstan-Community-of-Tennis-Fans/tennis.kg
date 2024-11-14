import { useTournaments } from '@/features/tournaments/hooks/useTournaments';
import RankFilter from '@/features/tournaments/components/RankFilter/RankFilter';
import TournamentAccordion from '@/features/tournaments/components/TournamentAccordion/TournamentAccordion';
import { CURRENT_YEAR_FULL } from '@/consts';

const CalendarPage = () => {
  const { tournaments, tournamentsFetching } = useTournaments();

  return (
    <div className='max-w-[900px] mx-auto'>
      <h1 className='mt-5 mb-10 font-semibold text-2xl md:text-3xl text-center'>Календарь ближайших турниров</h1>
      <div className='mb-8'>
        <RankFilter />
      </div>
      <TournamentAccordion tournaments={tournaments} isFetching={tournamentsFetching} currentYear={CURRENT_YEAR_FULL} />
    </div>
  );
};

export default CalendarPage;
