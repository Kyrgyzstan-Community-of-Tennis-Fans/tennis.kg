const CURRENT_YEAR = new Date().getFullYear() % 100;

export const validateEventDate = (date: string) => {
  let value = date.replace(/\D/g, '');

  if (value.length > 6) {
    value = value.slice(0, 6);
  }

  let formattedDate = '';

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

    if (year.length === 2) {
      let fullYear = parseInt(year, 10);
      fullYear = fullYear < CURRENT_YEAR ? CURRENT_YEAR : fullYear;
      formattedDate += fullYear.toString().padStart(2, '0');
    } else {
      formattedDate += year;
    }
  }

  return formattedDate;
};
