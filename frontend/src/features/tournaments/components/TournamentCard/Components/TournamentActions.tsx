import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { API_URl } from '@/consts';
import { Tournament } from '@/types/tournament';

const TournamentActions = ({ tournament, permission }: { tournament: Tournament; permission: boolean }) => {
  const renderActionItem = (text: string, link?: string | null) => {
    if (!link) {
      return null;
    }

    return permission ? (
      <a
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className='hover:text-[#4d4d4d] dark:hover:text-black mt-1 text-[#8c8c8c] dark:text-[#4d4d4d] underline underline-offset-2'
      >
        {text}
      </a>
    ) : (
      <Popover>
        <PopoverTrigger asChild>
          <span className='text-[#8c8c8c] dark:text-[#4d4d4d] mt-1 cursor-pointer underline underline-offset-2'>
            {text}
          </span>
        </PopoverTrigger>
        <PopoverContent className='bg-gray-100 text-xs'>
          Этот функционал доступен только для зарегистрированных пользователей. Пожалуйста, войдите или
          зарегистрируйтесь, чтобы получить доступ.
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className='flex flex-col text-[13px] mt-3 sm:mt-0'>
      {renderActionItem(
        'Результаты Турнира',
        tournament.resultsLink && tournament.resultsLink !== '' ? tournament.resultsLink : null,
      )}
      {renderActionItem(
        'Регламент Турнира',
        tournament.regulationsDoc ? `${API_URl}/${tournament.regulationsDoc}` : null,
      )}
    </div>
  );
};

export default TournamentActions;
