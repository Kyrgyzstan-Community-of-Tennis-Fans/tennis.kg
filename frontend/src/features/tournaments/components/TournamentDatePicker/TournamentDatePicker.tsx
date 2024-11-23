import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { Calendar } from '@/components/ui/calendar';
import { Tournament } from '@/types/tournament';
import { CURRENT_YEAR_FULL, NEXT_YEAR, PREVIOUS_YEAR } from '@/consts';

interface DatePickerProps {
  value: string;
  onChange: (date: Date | undefined) => void;
  existingTournament: Tournament | undefined;
}

const TournamentDatePicker: React.FC<DatePickerProps> = ({ value, onChange, existingTournament }) => {
  const getDateFromState = (dateString: string) => {
    const dateParts = dateString.split('.');

    if (dateParts.length === 3) {
      const [day, month, year] = dateParts;
      return new Date(`${parseInt(year) + 2000}-${month}-${day}`);
    }

    return null;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='w-full pl-3 text-left font-normal'>
          {value ? format(getDateFromState(value) || new Date(), 'PPP', { locale: ru }) : <span>Выберите дату</span>}
          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-full p-0'>
        <Calendar
          required
          mode='single'
          initialFocus
          captionLayout='dropdown-buttons'
          selected={getDateFromState(value) || undefined}
          onSelect={(date) => {
            if (date) onChange(date);
          }}
          fromYear={
            existingTournament && Number(existingTournament.tournamentYear) === PREVIOUS_YEAR
              ? PREVIOUS_YEAR
              : CURRENT_YEAR_FULL
          }
          toYear={NEXT_YEAR}
          defaultMonth={getDateFromState(value) || new Date()}
          locale={ru}
        />
      </PopoverContent>
    </Popover>
  );
};

export default TournamentDatePicker;
