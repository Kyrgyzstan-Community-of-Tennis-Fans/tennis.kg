import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { selectLoginError, selectLoginLoading } from '@/features/users/usersSlice';
import { login } from '@/features/users/usersThunks';
import type { LoginMutation } from '@/types/userTypes';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import React, { type ChangeEvent, type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialState: LoginMutation = {
  telephone: '',
  password: '',
};

const errorStyles = 'ring-1 ring-red-500';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectLoginError);
  const navigate = useNavigate();
  const [loginMutation, setLoginMutation] = useState(initialState);
  const [errors, setErrors] = useState<{ [key in keyof LoginMutation]?: boolean }>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const formattedValue = value.replace(/[^+\d]/g, '').replace(/^(.+)\+/, '$1');

    switch (id) {
      case 'telephone':
        setLoginMutation((prev) => ({ ...prev, [id]: formattedValue }));
        break;
      case 'password':
        setLoginMutation((prev) => ({ ...prev, [id]: value }));
        break;
    }

    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: { [key in keyof LoginMutation]?: boolean } = {};
    Object.keys(loginMutation).forEach((key) => {
      const field = key as keyof LoginMutation;
      if (!loginMutation[field]) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await dispatch(login(loginMutation)).unwrap();
      navigate('/');
    }
  };

  return (
    <div className={'xs:bg-[url("/muted-logo.svg")] h-16 mt-2 ml-2 bg-left-top bg-no-repeat'}>
      <form onSubmit={handleSubmit}>
        <section
          className={
            'w-full py-10 px-6 xs:max-w-[545px] xs:py-12 xs:px-10 absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 rounded-3xl'
          }
          style={{
            boxShadow: '0px 4px 100px 0px #00000017',
          }}
        >
          <div className={'mb-7'}>
            <h1 className={'font-bold text-[28px] mb-2'}>Добро пожаловать.</h1>
            <p className={'text-sm text-black/75'}>
              Пожалуйста, введите ваш телефон и пароль для входа в личный кабинет.
            </p>
          </div>

          <div className={'mb-4'}>
            <div className={'flex justify-between'}>
              <Label htmlFor={'telephone'} className={'text-base font-medium block mb-1'}>
                Номер телефона
              </Label>
              {error && <span className={'text-sm text-red-500'}>{error.error}</span>}
            </div>
            <Input
              className={`h-12 focus-visible:ring-[#80BC41] ${errors.telephone && errorStyles}`}
              id={'telephone'}
              value={loginMutation.telephone}
              onChange={handleChange}
              placeholder={'+996 ... ... ...'}
              type={'number'}
            />
          </div>

          <div className={'mb-8'}>
            <div className={'flex justify-between'}>
              <Label htmlFor={'password'} className={'text-base font-medium block mb-1'}>
                Пароль
              </Label>
              {error && <span className={'text-sm text-red-500'}>{error.error}</span>}
            </div>
            <Input
              type={'password'}
              className={`h-12 focus-visible:ring-[#80BC41] ${errors.password && errorStyles}`}
              id={'password'}
              placeholder={'Введите пароль'}
              value={loginMutation.password}
              onChange={handleChange}
            />
          </div>

          <Button
            disabled={loading}
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
              className={
                'bg-[#D9EBC6] text-[#3F6A11] shadow-none w-full h-12 uppercase rounded-full hover:bg-[#C8E1B1]'
              }
            >
              Создать аккаунт
            </Button>
          </Link>
        </section>
      </form>
    </div>
  );
};
