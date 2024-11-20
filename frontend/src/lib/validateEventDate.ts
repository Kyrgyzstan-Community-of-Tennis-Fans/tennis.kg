import { PREVIOUS_YEAR } from '@/consts';

export const validateEventDate = (date: string, allowedYears: number[], isEditingPreviousYear: boolean) => {
  let value = date.replace(/\D/g, '');

  if (value.length > 6) {
    value = value.slice(0, 6);
  }

  let formattedDate = '';
  let isYearValid = true;

  if (value.length > 0) {
    const day = value.slice(0, 2);
    formattedDate += parseInt(day, 10) > 31 ? '31' : day;
  }

  if (value.length > 2) {
    formattedDate += '.';
    const month = value.slice(2, 4);
    formattedDate += parseInt(month, 10) > 12 ? '12' : month;
  }

  if (value.length >= 4) {
    formattedDate += '.';
    const year = value.slice(4);
    const fullYear = 2000 + parseInt(year, 10);

    if (year.length === 2) {
      const extendedAllowedYears = isEditingPreviousYear ? [...allowedYears, PREVIOUS_YEAR] : allowedYears;

      if (!extendedAllowedYears.includes(fullYear)) {
        isYearValid = false;
      }
    }

    formattedDate += year;
  }

  return { formattedDate, isYearValid };
};
