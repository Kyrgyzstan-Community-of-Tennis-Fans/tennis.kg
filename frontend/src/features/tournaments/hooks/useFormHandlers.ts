import React from 'react';
import { TournamentMutation } from '@/types/tournamentTypes';
import { validateEventDate } from '@/lib/validateEventDate';

export const useFormHandlers = (
  state: TournamentMutation,
  setState: React.Dispatch<React.SetStateAction<TournamentMutation>>,
) => {
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
    const selectedYear = state.tournamentYear ? parseInt(state.tournamentYear, 10) : null;
    const formattedDate = validateEventDate(value, selectedYear);

    setState((prevState) => ({
      ...prevState,
      [name]: formattedDate,
    }));
  };

  return { handleChange, handleChangeSelect, fileInputChangeHandler, handleDateChange };
};
