import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import TournamentCardsList from '@/features/tournaments/components/TournamentCardsList/TournamentCardsList';
import { Tournaments } from '@/types/tournamentTypes';
import { MONTH_NAMES } from '@/consts';

interface Props {
  tournaments: Tournaments;
  currentYear: number;
  isFetching: boolean;
  isAdmin?: boolean;
}

const TournamentAccordion: React.FC<Props> = ({ tournaments, currentYear, isFetching, isAdmin }) => {
  return (
    <Accordion type='multiple'>
      {Object.entries(tournaments).map(([month, tournamentList]) => (
        <AccordionItem key={month} value={month} className='p-0 bg-0 border-0'>
          <AccordionTrigger className='rounded-md bg-[#64B32C] bg-opacity-25 px-5 mb-1  py-3 hover:no-underline '>
            <div className='flex gap-2 text-md text-[#3F6A11] italic font-extrabold uppercase'>
              <span>{MONTH_NAMES[Number(month) - 1]}</span>
              <span>{currentYear}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-1 py-1'>
            <TournamentCardsList tournaments={tournamentList} isFetching={isFetching} isAdmin={isAdmin} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default TournamentAccordion;
