import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { selectLoginError, selectLoginLoading } from '@/features/users/usersSlice';
import { login } from '@/features/users/usersThunks';
import { formatTelephone } from '@/lib/formatTelephone';
import type { LoginMutation } from '@/types/userTypes';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import React, { type ChangeEvent, type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialState: LoginMutation = {
  telephone: '',
  password: '',
};

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectLoginError);
  const navigate = useNavigate();
  const [loginMutation, setLoginMutation] = useState(initialState);

  const translatedError = error?.error === 'Username not found!' ? 'Неверный номер телефона или пароль' : error?.error;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === 'telephone') {
      const formattedPhone = formatTelephone(value);

      setLoginMutation((prev) => ({ ...prev, telephone: formattedPhone }));
      return;
    }

    setLoginMutation((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await dispatch(login(loginMutation)).unwrap();
    navigate('/');
  };

  const isButtonDisabled = !loginMutation.telephone || !loginMutation.password;

  return (
    <form onSubmit={handleSubmit}>
      <section
        className={'w-full my-14 mx-auto py-10 px-6 xs:max-w-[545px] xs:py-12 xs:px-10 rounded-3xl'}
        style={{
          boxShadow: '0px 4px 100px 0px #00000017',
        }}
      >
        <div className={'mb-7'}>
          <h1 className={'font-bold text-[28px] mb-2'}>Добро пожаловать</h1>
          <p className={'text-sm text-black/75'}>Пожалуйста, введите ваш телефон и пароль для входа в личный кабинет</p>
        </div>

        <div className={'mb-4'}>
          <div className={'flex justify-between flex-col sm:flex-row'}>
            <Label htmlFor={'telephone'} className={'text-base font-medium block leading-none sm:mb-1'}>
              Номер телефона
            </Label>
            {error && <span className={'text-sm text-red-500'}>{translatedError}</span>}
          </div>
          <Input
            className={'h-12 focus-visible:ring-[#80BC41]'}
            id={'telephone'}
            value={loginMutation.telephone}
            onChange={handleChange}
            placeholder={'0500 000 000'}
            type={'tel'}
          />
        </div>

        <div className={'mb-8'}>
          <div className={'flex justify-between flex-col sm:flex-row'}>
            <Label htmlFor={'password'} className={'text-base font-medium block leading-none sm:mb-1'}>
              Пароль
            </Label>
            {error && <span className={'text-sm text-red-500'}>{translatedError}</span>}
          </div>
          <Input
            type={'password'}
            className={'h-12 focus-visible:ring-[#80BC41]'}
            id={'password'}
            autoComplete={'current-password'}
            placeholder={'Введите пароль'}
            value={loginMutation.password}
            onChange={handleChange}
          />
        </div>

        <Button
          disabled={loading || isButtonDisabled}
          className={'w-full h-14 bg-[#232A2E] flex justify-between px-10 font-bold mb-2.5'}
          type={'submit'}
        >
          Войти
          {loading ? <Loader /> : <ArrowLongRightIcon style={{ width: '2.5rem', height: '2.5rem' }} />}
        </Button>

        <Link
          to={'/forgot-password'}
          className={'block text-[#3F6A11] border-b border-[#3F6A11] leading-none mx-auto max-w-max mb-8'}
        >
          Забыли пароль?
        </Link>
        <Link
          to={'/register'}
          className={'block text-muted-foreground text-center mb-5 hover:underline underline-offset-2'}
        >
          У вас нет аккаунта?
        </Link>

        <Link to={'/register'}>
          <Button
            type={'button'}
            className={'bg-[#D9EBC6] text-[#3F6A11] shadow-none w-full h-12 uppercase rounded-full hover:bg-[#C8E1B1]'}
          >
            Создать аккаунт
          </Button>
        </Link>
      </section>
    </form>
  );
};
