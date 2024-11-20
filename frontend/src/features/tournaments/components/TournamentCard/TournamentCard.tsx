import React from 'react';
import { Tournament } from '@/types/tournamentTypes';
import { ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAdminTournaments } from '@/features/tournaments/hooks/useAdminTournaments';
import { useAppSelector } from '@/app/hooks';
import { selectPermission } from '@/features/users/usersSlice';
import { isTournamentUpcoming } from '@/features/tournaments/utils/tournamentHelpers';
import { Confirm } from '@/components/Confirm/Confirm';
import { Button } from '@/components/ui/button';
import TournamentEdit from '@/features/tournaments/components/TournamentEdit/TournamentEdit';
import TournamentInfo from '@/features/tournaments/components/TournamentCard/Components/TournamentInfo';
import TournamentActions from '@/features/tournaments/components/TournamentCard/Components/TournamentActions';

interface Props {
  tournament: Tournament;
  isAdmin?: boolean;
  tournamentsLastYearExist?: boolean;
}

const TournamentCard: React.FC<Props> = ({ tournament, isAdmin, tournamentsLastYearExist }) => {
  const { handleDelete, isDeleting } = useAdminTournaments();
  const permission = useAppSelector(selectPermission);

  return (
    <div className='rounded-[22px] bg-gradient-135 from-[#f5f5f5] dark:from-[#e1e1e1] from-30% sm:from-25% md:from-10% to-[#64B32C] dark:to-[#478c16] p-1'>
      <div className='flex flex-col bg-[white] dark:bg-[#aec9a5] rounded-[19px]'>
        <div className='px-3 py-3 sm:flex sm:justify-between'>
          <TournamentInfo tournament={tournament} />
          <div className='flex flex-col gap-3 sm:mt-auto'>
            <TournamentActions tournament={tournament} permission={permission} />
            <div className='text-[#64B32C] dark:text-[#478c16] font-semibold ml-auto sm:ml-0'>
              {isTournamentUpcoming(tournament.eventDate) ? (
                <a
                  href={tournament.registrationLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 hover:underline hover:underline-offset-2 text-sm'
                >
                  <span>Принять участие</span>
                  <ArrowRightIcon className='w-4 h-4' />
                </a>
              ) : (
                <span className='text-gray-400 italic text-sm dark:text-gray-600'>Турнир завершен</span>
              )}
            </div>
          </div>
        </div>
        {isAdmin && (
          <div className='ml-auto mt-1 gap-4 flex pr-3 mb-2'>
            <Confirm onOk={() => handleDelete(tournament._id)}>
              <Button size='sm' disabled={isDeleting === tournament._id}>
                <TrashIcon />
              </Button>
            </Confirm>
            <TournamentEdit
              existingTournament={tournament}
              id={tournament._id}
              tournamentsLastYearExist={tournamentsLastYearExist}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentCard;
