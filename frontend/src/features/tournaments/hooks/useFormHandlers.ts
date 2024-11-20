import React, { useState } from 'react';
import { Tournament, TournamentMutation } from '@/types/tournamentTypes';
import { validateEventDate } from '@/lib/validateEventDate';
import { CURRENT_YEAR_FULL, NEXT_YEAR, PREVIOUS_YEAR } from '@/consts';

export const useFormHandlers = (
  setState: React.Dispatch<React.SetStateAction<TournamentMutation>>,
  existingTournament?: Tournament,
) => {
  const [dateError, setDateError] = useState(false);

  const handleChangeSelect = (value: string, name: string) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const allowedYears = [CURRENT_YEAR_FULL, NEXT_YEAR];
    const isEditingPreviousYear = !!existingTournament && Number(existingTournament.tournamentYear) === PREVIOUS_YEAR;
    const { formattedDate, isYearValid } = validateEventDate(value, allowedYears, isEditingPreviousYear);

    setDateError(!isYearValid);

    setState((prevState) => {
      const year =
        formattedDate.length === 8 ? 2000 + parseInt(formattedDate.split('.')[2], 10) : prevState.tournamentYear;

      return {
        ...prevState,
        [name]: formattedDate,
        tournamentYear: year?.toString() || '',
      };
    });
  };

  return { handleChange, handleChangeSelect, fileInputChangeHandler, handleDateChange, dateError };
};
