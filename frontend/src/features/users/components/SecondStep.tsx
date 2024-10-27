import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RegisterMutation } from '@/types/userTypes';
import React, { type ChangeEvent } from 'react';

interface Props {
  registerMutation: RegisterMutation;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SecondStep: React.FC<Props> = ({ registerMutation, handleChange, handleDateChange }) => {
  return (
    <>
      <div className={'mb-4'}>
        <Label htmlFor={'dateOfBirth'} className={'text-base font-medium block mb-1'}>
          Дата рождения
        </Label>
        <Input
          className={'h-12 focus-visible:ring-[#80BC41]'}
          id={'dateOfBirth'}
          value={registerMutation.dateOfBirth}
          placeholder={'15.10.2007'}
          onChange={handleDateChange}
        />
      </div>

      <div className={'mb-4'}>
        <Label htmlFor={'fullName'} className={'text-base font-medium block mb-1'}>
          ФИО
        </Label>
        <Input
          className={'h-12 focus-visible:ring-[#80BC41]'}
          id={'fullName'}
          value={registerMutation.fullName}
          onChange={handleChange}
          placeholder={'Введите ваше полное ФИО'}
        />
      </div>
    </>
  );
};
