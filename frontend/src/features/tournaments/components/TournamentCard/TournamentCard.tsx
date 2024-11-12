import React from 'react';
import { Tournament } from '@/types/tournamentTypes';
import { API_URl } from '@/consts';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface Props {
  tournament: Tournament;
}

const TournamentCard: React.FC<Props> = ({ tournament }) => {
  const translatedRank = tournament.rank === 'mixed' ? 'Микс' : tournament.rank === 'female' ? 'Женский' : 'Мужской';
  return (
    <div className='rounded-[22px] bg-gradient-135 from-[white] from-30% sm:from-25% md:from-5% to-[#64B32C] p-1'>
      <div className='rounded-[19px] bg-[#ececec] px-3 py-3 sm:flex sm:justify-between'>
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
          <div className='flex flex-col gap-1 text-sm text-[#8c8c8c] underline underline-offset-2'>
            <a
              href={tournament.resultsLink}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-[#4d4d4d] '
            >
              Результаты Турнира
            </a>
            <a
              href={`${API_URl}/${tournament.regulationsDoc}`}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-[#4d4d4d]'
            >
              Регламент Турнира
            </a>
          </div>
          <div className='text-[#64B32C] font-semibold ml-auto sm:ml-0'>
            <a
              href={tournament.registrationLink}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 hover:underline hover:underline-offset-2 text-sm'
            >
              <span>Принять участие</span>
              <span className=''>
                <ArrowRightIcon className='w-4 h-4' />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
