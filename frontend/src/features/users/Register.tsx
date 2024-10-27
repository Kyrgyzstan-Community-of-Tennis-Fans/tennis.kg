import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { selectRanks, selectRanksFetching } from '@/features/ranks/ranksSlice';
import { fetchRanks } from '@/features/ranks/ranksThunks';
import { FirstStep } from '@/features/users/components/FirstStep';
import { SecondStep } from '@/features/users/components/SecondStep';
import { ThirdStep } from '@/features/users/components/ThirdStep';
import { selectRegisterError, selectRegisterLoading } from '@/features/users/usersSlice';
import { register } from '@/features/users/usersThunks';
import type { RegisterMutation } from '@/types/userTypes';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import React, { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const initialState: RegisterMutation = {
  telephone: '',
  password: '',
  rank: '',
  fullName: '',
  gender: '',
  dateOfBirth: '',
};

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRegisterLoading);
  const ranks = useAppSelector(selectRanks);
  const ranksFetching = useAppSelector(selectRanksFetching);
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [registerMutation, setRegisterMutation] = useState(initialState);
  const [step, setStep] = useState(1);
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const buttonDisabled = (() => {
    if (step === 1) {
      return !registerMutation.telephone || !registerMutation.password || registerMutation.password !== confirmPassword;
    }
    if (step === 2) {
      return !registerMutation.dateOfBirth || !registerMutation.fullName;
    }
    if (step === 3) {
      return !registerMutation.gender || !registerMutation.rank;
    }
    return false;
  })();

  useEffect(() => {
    if (error && error.errors) {
      for (const key in error.errors) {
        toast.error(error.errors[key].message);
      }
    }
  }, [error]);

  useEffect(() => {
    if (step === 3) {
      dispatch(fetchRanks());
    }
  }, [dispatch, step]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setRegisterMutation((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterMutation((prev) => ({
      ...prev,
      dateOfBirth: event.target.value,
    }));
  };

  const handleSelectChange = (value: string, id: string) => {
    let field: string = '';
    field = id === 'gender' ? 'gender' : id === 'rank' ? 'rank' : '';

    setRegisterMutation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      await dispatch(register(registerMutation)).unwrap();
      setRegisterMutation(initialState);
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Произошла ошибка при регистрации');
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div className={'xs:bg-[url("/muted-logo.svg")] h-16 mt-2 ml-2 bg-left-top bg-no-repeat'}>
      <form onSubmit={handleSubmit}>
        <section
          className={
            'w-full py-10 px-6 xs:max-w-[545px] xs:py-12 xs:px-10 fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 rounded-3xl'
          }
          style={{
            boxShadow: '0px 4px 100px 0px #00000017',
          }}
        >
          <div className={'mb-3'}>
            <h1 className={'font-bold text-[28px]'}>Создать аккаунт.</h1>
            <p className={'text-sm text-black/75'}>Пожалуйста, заполните все данные для создания аккаунта.</p>
          </div>

          {step === 1 ? (
            <FirstStep
              registerMutation={registerMutation}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              handleChange={handleChange}
            />
          ) : step === 2 ? (
            <SecondStep
              registerMutation={registerMutation}
              handleChange={handleChange}
              handleDateChange={handleDateChange}
            />
          ) : (
            <ThirdStep
              registerMutation={registerMutation}
              handleSelectChange={handleSelectChange}
              ranks={ranks}
              ranksFetching={ranksFetching}
            />
          )}

          <Button
            disabled={buttonDisabled}
            onClick={handleNextStep}
            type={step === 3 ? 'submit' : 'button'}
            className={'w-full h-14 bg-[#232A2E] flex justify-between px-10 font-bold mb-2.5'}
          >
            {step === 3 ? 'Зарегистрироваться' : 'Далее'}
            {loading ? <Loader /> : <ArrowLongRightIcon style={{ width: '2.5rem', height: '2.5rem' }} />}
          </Button>

          <Link
            to={'/forgot-password'}
            className={'block text-[#3F6A11] border-b border-[#3F6A11] leading-none mx-auto w-fit mb-4'}
          >
            Забыли пароль?
          </Link>

          <Link to={'/login'} className={'text-sm block text-center text-black/50 w-fit mx-auto'}>
            Уже зарегистрированы? <span className={'font-medium text-black'}>Войдите</span>
          </Link>
        </section>
      </form>
    </div>
  );
};
