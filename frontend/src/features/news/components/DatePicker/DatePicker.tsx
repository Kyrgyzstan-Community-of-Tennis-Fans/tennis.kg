'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { useDatePicker } from '@/features/news/hooks/useDatePicker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './datePicker.css';
import { XIcon } from 'lucide-react';

interface Props {
  onDateChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
}

export const DatePicker: React.FC<Props> = ({ onDateChange }) => {
  const { selectedDates, handleDateSelect, handleResetDates } = useDatePicker({ onDateChange });

  return (
    <div className='date-picker-block'>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'} className='filter-set-date h-12'>
            {selectedDates.startDate ? (
              format(selectedDates.startDate, 'PPP')
            ) : (
              <span className='text-black'>Начало даты</span>
            )}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='date-popover-content'>
          <Calendar
            mode='single'
            selected={selectedDates.startDate}
            onSelect={(date) => handleDateSelect(date, 'startDate')}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'} className='filter-set-date h-12'>
            {selectedDates.endDate ? (
              format(selectedDates.endDate, 'PPP')
            ) : (
              <span className='text-black'>Конец даты</span>
            )}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='date-popover-content'>
          <Calendar
            mode='single'
            selected={selectedDates.endDate}
            onSelect={(date) => handleDateSelect(date, 'endDate')}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button
        variant={'outline'}
        onClick={handleResetDates}
        className='filter-set-date h-12 text-cr-green-900 hover:text-rose-700'
      >
        Сбросить
        <XIcon />
      </Button>
    </div>
  );
};
