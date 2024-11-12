import { useTournaments } from '@/features/tournaments/hooks/useTournaments';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import TournamentCardsList from '@/features/tournaments/components/TournamentCardsList/TournamentCardsList';

const CalendarPage = () => {
  const { tournaments, tournamentsFetching } = useTournaments();
  const currentYear = new Date().getFullYear();

  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  return (
    <div className='max-w-[900px] mx-auto'>
      <h1 className='mt-5 mb-8 font-semibold text-3xl xs:text-4xl text-center'>Календарь ближайших турниров</h1>
      <Accordion type='multiple'>
        {Object.entries(tournaments).map(([month, tournamentList]) => (
          <AccordionItem key={month} value={month} className='p-0 bg-0 border-0'>
            <AccordionTrigger className='rounded-md bg-[#64B32C] bg-opacity-25 px-5 mb-1  py-3 hover:no-underline '>
              <div className='flex gap-2 text-md text-[#3F6A11] italic font-extrabold uppercase'>
                <span>{monthNames[Number(month) - 1]}</span>
                <span>{currentYear}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='flex flex-col gap-1 py-1'>
              <TournamentCardsList tournaments={tournamentList} isFetching={tournamentsFetching} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CalendarPage;
