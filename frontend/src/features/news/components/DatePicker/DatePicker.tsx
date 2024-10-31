'use client';

import * as React from 'react';
import { useState } from 'react';
import { format } from 'date-fns';
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
  const [selectedDates, setSelectedDates] = useState<{ startDate?: Date; endDate?: Date }>({});

  const handleDateSelect = (date: Date | undefined, type: 'startDate' | 'endDate') => {
    const newDates = {
      ...selectedDates,
      [type === 'startDate' ? 'startDate' : 'endDate']: date,
    };
    setSelectedDates(newDates);
    onDateChange(newDates.startDate, newDates.endDate);
  };

  const handleResetDates = () => {
    setSelectedDates({});
    onDateChange(undefined, undefined);
  };

  return (
    <div className='date_picker_block'>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'} className='set-date h-12'>
            {selectedDates.startDate ? (
              format(selectedDates.startDate, 'PPP')
            ) : (
              <span className='text-black'>Начало даты</span>
            )}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
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
          <Button variant={'outline'} className='set-date h-12'>
            {selectedDates.endDate ? (
              format(selectedDates.endDate, 'PPP')
            ) : (
              <span className='text-black'>Конец даты</span>
            )}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
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
        className='set-date h-12 text-cr-green-900 hover:text-rose-700'
      >
        Сбросить
        <XIcon />
      </Button>
    </div>
  );
};
