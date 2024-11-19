import React from 'react';
import { Tournament } from '@/types/tournamentTypes';
import TournamentCard from '@/features/tournaments/components/TournamentCard/TournamentCard';
import { Loader } from '@/components/Loader/Loader';

interface Props {
  tournaments: Tournament[];
  isFetching: boolean;
  isAdmin?: boolean;
  tournamentsLastYearExist?: boolean;
}

const TournamentCardsList: React.FC<Props> = ({ tournaments, isFetching, isAdmin, tournamentsLastYearExist }) => {
  let content: React.ReactNode = (
    <p className='my-3 text-center text-xs md:text-sm'>На данный момент турниры отсутствуют</p>
  );

  if (isFetching) {
    content = <Loader className='my-3 mx-auto' />;
  } else if (tournaments.length > 0) {
    content = tournaments.map((tournament) => (
      <TournamentCard
        key={tournament._id}
        tournament={tournament}
        isAdmin={isAdmin}
        tournamentsLastYearExist={tournamentsLastYearExist}
      />
    ));
  }

  return <div className='flex flex-col gap-1 pb-1'>{content}</div>;
};

export default TournamentCardsList;
