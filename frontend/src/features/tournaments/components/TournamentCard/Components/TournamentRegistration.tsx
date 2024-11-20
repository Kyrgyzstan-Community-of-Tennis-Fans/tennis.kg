import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { isTournamentUpcoming } from '@/features/tournaments/utils/tournamentHelpers';
import { Tournament } from '@/types/tournamentTypes';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Props {
  tournament: Tournament;
}

const TournamentRegistrationLink: React.FC<Props> = ({ tournament }) => {
  const tournamentStatus = isTournamentUpcoming(tournament.eventDate);

  if (tournamentStatus === 'upcoming') {
    return (
      <a
        href={tournament.registrationLink}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-2 hover:underline hover:underline-offset-2 text-sm'
      >
        <span>Принять участие</span>
        <ArrowRightIcon className='w-4 h-4' />
      </a>
    );
  }

  if (tournamentStatus === 'today') {
    return (
      <Popover>
        <PopoverTrigger>
          <span className='flex items-center gap-2 text-sm'>
            Принять участие
            <ArrowRightIcon className='w-4 h-4' />
          </span>
        </PopoverTrigger>
        <PopoverContent className='bg-gray-100 text-xs'>Запись на турнир завершена</PopoverContent>
      </Popover>
    );
  }

  return <span className='text-gray-400 italic text-sm dark:text-gray-600'>Турнир завершен</span>;
};

export default TournamentRegistrationLink;
