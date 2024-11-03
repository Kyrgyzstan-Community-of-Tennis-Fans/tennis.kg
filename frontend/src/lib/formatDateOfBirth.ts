export const formatDateOfBirth = (date: string) => {
  let value = date.replace(/\D/g, '');

  if (value.length > 8) {
    value = value.slice(0, 8);
  }

  let formattedDate = '';

  if (value.length > 0) {
    const day = value.slice(0, 2);
    if (parseInt(day, 10) > 31) {
      formattedDate += '31';
    } else {
      formattedDate += day;
    }
  }
  if (value.length > 2) {
    formattedDate += '.';
    const month = value.slice(2, 4);
    if (parseInt(month, 10) > 12) {
      formattedDate += '12';
    } else {
      formattedDate += month;
    }
  }
  if (value.length > 4) {
    formattedDate += '.';
    formattedDate += value.slice(4);
  }

  return formattedDate;
};
