import React from 'react';
import RankFilter from '@/features/tournaments/components/RankFilter/RankFilter';
import TournamentAccordion from '@/features/tournaments/components/TournamentAccordion/TournamentAccordion';
import { Tournaments } from '@/types/tournament';
import { Layout } from '@/components/Layout';
import { CURRENT_YEAR_FULL, NEXT_YEAR, PREVIOUS_YEAR } from '@/consts';

interface Props {
  tournaments: Tournaments;
  isFetching: boolean;
  isAdmin?: boolean;
  tournamentsLastYearExist?: boolean;
}

const TournamentCalendar: React.FC<Props> = ({ tournaments, isFetching, isAdmin, tournamentsLastYearExist }) => {
  const hasPreviousTournaments = Object.values(tournaments.previousYear).some((month) => month.length > 0);
  const hasNextTournaments = Object.values(tournaments.nextYear).some((month) => month.length > 0);
  const calendarTitleStyles = 'text-xl sm:text-2xl font-bold text-[#3F6A11] dark:text-white mb-5 uppercase text-center';

  return (
    <Layout className='max-w-[900px] mx-auto'>
      <div>
        <h1 className='mb-10 font-semibold text-2xl md:text-3xl text-center'>Календарь турниров</h1>
        <div className='mb-8'>
          <RankFilter />
        </div>
        <div className='mb-10'>
          <div className={calendarTitleStyles}>{CURRENT_YEAR_FULL}</div>
          <TournamentAccordion
            tournaments={tournaments.currentYear}
            isFetching={isFetching}
            isAdmin={isAdmin}
            tournamentsLastYearExist={tournamentsLastYearExist}
          />
        </div>
        {hasNextTournaments ? (
          <div className='mt-8'>
            <div className={calendarTitleStyles}>{NEXT_YEAR}</div>
            <TournamentAccordion
              tournaments={tournaments.nextYear}
              isFetching={isFetching}
              isAdmin={isAdmin}
              tournamentsLastYearExist={tournamentsLastYearExist}
            />
          </div>
        ) : hasPreviousTournaments ? (
          <div className='mt-8'>
            <div className={calendarTitleStyles}>{PREVIOUS_YEAR}</div>
            <TournamentAccordion
              tournaments={tournaments.previousYear}
              isFetching={isFetching}
              isAdmin={isAdmin}
              tournamentsLastYearExist={tournamentsLastYearExist}
            />
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default TournamentCalendar;
