export const validateEventDate = (date: string, selectedYear: number | null) => {
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
      let fullYear: number | null = parseInt(year, 10);
      fullYear = fullYear !== selectedYear ? selectedYear : fullYear;
      formattedDate += fullYear?.toString().slice(-2);
    } else {
      formattedDate += year;
    }
  }

  return formattedDate;
};
