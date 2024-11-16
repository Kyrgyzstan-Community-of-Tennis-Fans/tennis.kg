import React from 'react';
import { Tournament } from '@/types/tournamentTypes';
import { API_URl } from '@/consts';
import { ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Confirm } from '@/components/Confirm/Confirm';
import TournamentEdit from '@/features/tournaments/components/TournamentEdit/TournamentEdit';
import { useAdminTournaments } from '@/features/tournaments/hooks/useAdminTournaments';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';

interface Props {
  tournament: Tournament;
  isAdmin?: boolean;
}

const TournamentCard: React.FC<Props> = ({ tournament, isAdmin }) => {
  const translatedRank = tournament.rank === 'mixed' ? 'Микст' : tournament.rank === 'female' ? 'Женский' : 'Мужской';
  const { handleDelete, isDeleting } = useAdminTournaments();
  const user = useAppSelector(selectUser);

  return (
    <div className='rounded-[22px] bg-gradient-135 from-[#f5f5f5] from-30% sm:from-25% md:from-10% to-[#64B32C] p-1'>
      <div className='flex flex-col bg-[white] rounded-[19px]'>
        <div className='px-3 py-3 sm:flex sm:justify-between'>
          <div>
            <div className='flex gap-2 items-center font-bold text-sm md:text-base'>
              <h1 className=''>Турнир “{tournament.name}”</h1>
              <span className='text-[#64B32C] italic'>{tournament.category}</span>
            </div>
            <div className='flex flex-col gap-1 text-sm mt-3 mb-3 sm:mb-0 sm:mt-2 text-[#4d4d4d]'>
              <div className='flex gap-3'>
                <span>Дата проведения:</span>
                <span className='text-black'>{tournament.eventDate}</span>
              </div>
              <div className='flex gap-3'>
                <span>Разряд:</span>
                <span className='text-black'>{translatedRank}</span>
              </div>
              <div className='flex gap-3'>
                <span>Кол-во участников:</span>
                <span className='text-black'>{tournament.participants}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:mt-auto'>
            <div className='flex flex-col text-[13px] text-[#8c8c8c] underline underline-offset-2'>
              {user && user.isActive ? (
                <>
                  <a
                    href={tournament.resultsLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-[#4d4d4d]'
                  >
                    Результаты Турнира
                  </a>
                  {tournament.regulationsDoc !== null && (
                    <a
                      href={`${API_URl}/${tournament.regulationsDoc}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:text-[#4d4d4d] mt-1'
                    >
                      Регламент Турнира
                    </a>
                  )}
                </>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <div className='flex flex-col text-[13px] text-[#8c8c8c] underline underline-offset-2'>
                      <span className='text-[#8c8c8c] hover:text-[#4d4d4d] cursor-pointer'>Результаты Турнира</span>
                      {tournament.regulationsDoc !== null && (
                        <span className='text-[#8c8c8c] hover:text-[#4d4d4d] cursor-pointer mt-1'>
                          Регламент Турнира
                        </span>
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <small>Чтобы просмотреть результаты и регламент турнира, войдите в систему</small>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <div className='text-[#64B32C] font-semibold ml-auto sm:ml-0'>
              <a
                href={tournament.registrationLink}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 hover:underline hover:underline-offset-2 text-sm'
              >
                <span>Принять участие</span>
                <span>
                  <ArrowRightIcon className='w-4 h-4' />
                </span>
              </a>
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
            <TournamentEdit existingTournament={tournament} id={tournament._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentCard;
