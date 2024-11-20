import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import TournamentCardsList from '@/features/tournaments/components/TournamentCardsList/TournamentCardsList';
import { Tournament } from '@/types/tournamentTypes';
import { MONTH_NAMES } from '@/consts';

interface Props {
  tournaments: { [month: string]: Tournament[] };
  isFetching: boolean;
  isAdmin?: boolean;
  tournamentsLastYearExist?: boolean;
}

const TournamentAccordion: React.FC<Props> = ({ tournaments, isFetching, isAdmin, tournamentsLastYearExist }) => {
  return (
    <Accordion type='multiple'>
      {Object.entries(tournaments).map(([month, tournamentList]) => (
        <AccordionItem key={month} value={month} className='p-0 bg-0 border-0'>
          <AccordionTrigger className='rounded-md bg-[#64B32C] bg-opacity-25 dark:bg-opacity-40 px-5 mb-1 py-3 hover:no-underline'>
            <div className='text-sm sm:text-base text-[#3F6A11] dark:text-[#d9ead3] italic font-extrabold uppercase'>
              <span>{MONTH_NAMES[Number(month) - 1]}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-1 py-1'>
            <TournamentCardsList
              tournaments={tournamentList}
              isFetching={isFetching}
              isAdmin={isAdmin}
              tournamentsLastYearExist={tournamentsLastYearExist}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default TournamentAccordion;
