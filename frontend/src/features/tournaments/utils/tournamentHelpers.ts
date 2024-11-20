import { isBefore, parse } from 'date-fns';

export const isTournamentUpcoming = (eventDate: string): boolean => {
  const parsedDate = parse(eventDate, 'dd.MM.yy', new Date());
  const currentDate = new Date();

  return !isBefore(parsedDate, currentDate);
};

export function translateRank(rank: string): string {
  switch (rank) {
    case 'mixed':
      return 'Микст';
    case 'female':
      return 'Женский';
    case 'male':
      return 'Мужской';
    default:
      return 'Неизвестный разряд';
  }
}
