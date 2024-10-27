import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RegisterMutation } from '@/types/userTypes';
import React, { type ChangeEvent } from 'react';

interface Props {
  registerMutation: RegisterMutation;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
}

export const FirstStep: React.FC<Props> = ({ registerMutation, handleChange, setConfirmPassword, confirmPassword }) => {
  return (
    <>
      <div className={'mb-2'}>
        <Label htmlFor={'telephone'} className={'text-base font-medium block mb-1'}>
          Номер телефона
        </Label>
        <Input
          className={'h-12 focus-visible:ring-[#80BC41]'}
          id={'telephone'}
          value={registerMutation.telephone}
          onChange={handleChange}
          placeholder={'+996 ... ... ...'}
          type={'tel'}
        />
      </div>

      <div className={'mb-2'}>
        <Label htmlFor={'password'} className={'text-base font-medium block mb-1'}>
          Пароль
        </Label>
        <Input
          type={'password'}
          className={'h-12 focus-visible:ring-[#80BC41]'}
          id={'password'}
          placeholder={'Введите пароль'}
          value={registerMutation.password}
          onChange={handleChange}
        />
      </div>

      <div className={'mb-5'}>
        <Label htmlFor={'confirm-password'} className={'text-base font-medium block mb-1'}>
          Подтвердите пароль
        </Label>
        <Input
          type={'password'}
          className={'h-12 focus-visible:ring-[#80BC41]'}
          id={'confirm-password'}
          placeholder={'Введите пароль'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
    </>
  );
};
