'use client';

import * as React from 'react';
import { useState } from 'react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Props {
  firstDate?: Date;
  secondDate?: Date;
  onDateChange: (firstDate: Date | undefined, secondDate: Date | undefined) => void; // Add this line
}

export const DatePicker: React.FC<Props> = ({ firstDate, secondDate, onDateChange }) => {
  const [selectedFirstDate, setSelectedFirstDate] = useState<Date | undefined>(firstDate);
  const [selectedSecondDate, setSelectedSecondDate] = useState<Date | undefined>(secondDate);

  const handleFirstDateSelect = (date: Date | undefined) => {
    setSelectedFirstDate(date);
    onDateChange(date, selectedSecondDate);
  };

  const handleSecondDateSelect = (date: Date | undefined) => {
    setSelectedSecondDate(date);
    onDateChange(selectedFirstDate, date);
  };

  return (
    <div className='flex flex-wrap justify-between items-center xs:justify-start gap-2.5 mb-7'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full xs:w-[200px] justify-start text-left font-normal',
              !selectedFirstDate && 'text-muted-foreground',
            )}
          >
            {selectedFirstDate ? format(selectedFirstDate, 'PPP') : <span>Начало даты</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar mode='single' selected={selectedFirstDate} onSelect={handleFirstDateSelect} initialFocus />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full xs:w-[200px] justify-start text-left font-normal',
              !selectedSecondDate && 'text-muted-foreground',
            )}
          >
            {selectedSecondDate ? format(selectedSecondDate, 'PPP') : <span>Конец даты</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar mode='single' selected={selectedSecondDate} onSelect={handleSecondDateSelect} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
};
