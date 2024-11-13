import React from 'react';
import { TournamentMutation } from '@/types/tournamentTypes';

export const useFormHandlers = (setState: React.Dispatch<React.SetStateAction<TournamentMutation>>) => {
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

  return { handleChange, handleChangeSelect, fileInputChangeHandler };
};
