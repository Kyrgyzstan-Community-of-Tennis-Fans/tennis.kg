import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { selectRanks, selectRanksFetching } from '@/features/ranks/ranksSlice';
import { fetchRanks } from '@/features/ranks/ranksThunks';
import { selectRegisterError, selectRegisterLoading } from '@/features/users/usersSlice';
import { register } from '@/features/users/usersThunks';
import type { RegisterMutation } from '@/types/userTypes';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import React, { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialState: RegisterMutation = {
  telephone: '',
  password: '',
  avatar: null,
  rank: '',
  fullName: '',
  gender: '',
  dateOfBirth: '',
};

const errorStyles = 'ring-1 ring-red-500';

type ErrorState = {
  [key in keyof RegisterMutation]?: boolean;
} & {
  confirmPassword?: boolean;
};

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRegisterLoading);
  const ranks = useAppSelector(selectRanks);
  const ranksFetching = useAppSelector(selectRanksFetching);
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [registerMutation, setRegisterMutation] = useState(initialState);
  const [errors, setErrors] = useState<ErrorState>({});
  const [step, setStep] = useState(1);
  const [confirmPassword, setConfirmPassword] = useState<{ value: string; match: boolean }>({
    value: '',
    match: false,
  });

  useEffect(() => {
    if (step === 3) {
      dispatch(fetchRanks());
    }
  }, [dispatch, step]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === 'telephone') {
      const formattedValue = value.replace(/[^+\d]/g, '').replace(/^(.+)\+/, '$1');
      setRegisterMutation((prev) => ({ ...prev, [id]: formattedValue }));
    } else {
      setRegisterMutation((prev) => ({ ...prev, [id]: value }));
    }

    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regex = /^\d{0,2}(\.\d{0,2})?(\.\d{0,4})?$/;

    if (regex.test(value) || value === '') {
      setRegisterMutation((prev) => ({
        ...prev,
        dateOfBirth: value,
      }));
      setErrors((prev) => ({ ...prev, dateOfBirth: false }));
    } else {
      setErrors((prev) => ({ ...prev, dateOfBirth: true }));
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, files } = event.target;
    const value = files && files.length > 0 ? files[0] : null;
    setRegisterMutation((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleGenderChange = (value: string) => {
    setRegisterMutation((prev) => ({
      ...prev,
      gender: value,
    }));

    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, gender: false }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setRegisterMutation((prev) => ({
      ...prev,
      rank: value,
    }));

    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, rank: false }));
    }
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setConfirmPassword(() => ({
      value,
      match: value === registerMutation.password,
    }));

    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, confirmPassword: false }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: ErrorState = {};
    Object.keys(registerMutation).forEach((key) => {
      const field = key as keyof RegisterMutation;
      if (!registerMutation[field]) {
        newErrors[field] = true;
      }
    });

    if (!confirmPassword.match) {
      newErrors.confirmPassword = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await dispatch(register(registerMutation)).unwrap();
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleNextStep = () => {
    const newErrors: ErrorState = {};

    if (step === 1) {
      if (!registerMutation.telephone) {
        newErrors.telephone = true;
      }
      if (!registerMutation.password) {
        newErrors.password = true;
      }

      if (!confirmPassword.match) {
        newErrors.confirmPassword = true;
      }
    }

    if (step === 2) {
      if (!registerMutation.avatar) {
        newErrors.avatar = true;
      }
      if (!registerMutation.fullName) {
        newErrors.fullName = true;
      }
    }

    if (step === 3) {
      if (!registerMutation.rank) {
        newErrors.rank = true;
      }
      if (!registerMutation.gender) {
        newErrors.gender = true;
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && step < 3) {
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
            <>
              <div className={'mb-2'}>
                <div className={'flex justify-between items-center'}>
                  <Label htmlFor={'telephone'} className={'text-base font-medium block mb-1'}>
                    Номер телефона
                  </Label>
                  {error && <span className={'text-sm text-red-500'}>{error.message}</span>}
                </div>
                <Input
                  className={`h-12 focus-visible:ring-[#80BC41] ${errors.telephone && errorStyles}`}
                  id={'telephone'}
                  value={registerMutation.telephone}
                  onChange={handleChange}
                  placeholder={'+996 ... ... ...'}
                  type={'tel'}
                />
              </div>

              <div className={'mb-2'}>
                <div className={'flex justify-between items-center'}>
                  <Label htmlFor={'password'} className={'text-base font-medium block mb-1'}>
                    Пароль
                  </Label>
                  {error && <span className={'text-sm text-red-500'}>{error.message}</span>}
                </div>
                <Input
                  type={'password'}
                  className={`h-12 focus-visible:ring-[#80BC41] ${errors.password && errorStyles}`}
                  id={'password'}
                  placeholder={'Введите пароль'}
                  value={registerMutation.password}
                  onChange={handleChange}
                />
              </div>

              <div className={'mb-5'}>
                <div className={'flex justify-between items-center'}>
                  <Label htmlFor={'confirm-password'} className={'text-base font-medium block mb-1'}>
                    Подтвердите пароль
                  </Label>
                  {errors.confirmPassword && <span className={'text-sm text-red-500'}>Пароли не совпадают</span>}
                </div>
                <Input
                  type={'password'}
                  className={`h-12 focus-visible:ring-[#80BC41] ${((!confirmPassword.match && registerMutation.password.length) || errors.confirmPassword) && errorStyles}`}
                  id={'confirm-password'}
                  placeholder={'Введите пароль'}
                  value={confirmPassword.value}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
            </>
          ) : step === 2 ? (
            <>
              <div className={'mb-4'}>
                <div className={'flex justify-between items-center'}>
                  <Label htmlFor={'avatar'} className={'text-base font-medium block mb-1'}>
                    Фото профиля
                  </Label>
                  {error && <span className={'text-sm text-red-500'}>{error.message}</span>}
                </div>
                <Input
                  className={`py-2.5 pb-8 focus-visible:ring-[#80BC41] ${errors.avatar && errorStyles}`}
                  id={'avatar'}
                  type={'file'}
                  onChange={handleImageChange}
                />
              </div>

              <div className={'mb-4'}>
                <div className={'flex justify-between items-center'}>
                  <Label htmlFor={'fullName'} className={'text-base font-medium block mb-1'}>
                    ФИО
                  </Label>
                  {error && <span className={'text-sm text-red-500'}>{error.message}</span>}
                </div>
                <Input
                  className={`h-12 focus-visible:ring-[#80BC41] ${errors.fullName && errorStyles}`}
                  id={'fullName'}
                  value={registerMutation.fullName}
                  onChange={handleChange}
                  placeholder={'Введите ваше полное ФИО'}
                />
              </div>
            </>
          ) : (
            <>
              <div className={'mb-4'}>
                <div className={'flex justify-between items-center'}>
                  <Label htmlFor={'dateOfBirth'} className={'text-base font-medium block mb-1'}>
                    Дата рождения
                  </Label>
                  {errors.dateOfBirth && <span className={'text-sm text-red-500'}>Укажите дату рождения</span>}
                </div>
                <Input
                  className={`h-12 focus-visible:ring-[#80BC41] ${errors.dateOfBirth && errorStyles}`}
                  id={'dateOfBirth'}
                  value={registerMutation.dateOfBirth}
                  placeholder={'15.10.2007'}
                  onChange={handleDateChange}
                />
              </div>

              <div className={'mb-4'}>
                <div className={'flex justify-between items-center'}>
                  <Label htmlFor={'gender'} className={'text-base font-medium block mb-1'}>
                    Пол
                  </Label>
                  {error && <span className={'text-sm text-red-500'}>{error.message}</span>}
                </div>
                <Select value={registerMutation.gender} onValueChange={(value) => handleGenderChange(value)}>
                  <SelectTrigger id={'gender'} className={`${errors.gender && errorStyles}`}>
                    <SelectValue placeholder='Укажите ваш пол' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='male'>Мужской</SelectItem>
                      <SelectItem value='female'>Женский</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className={'mb-4'}>
                <div className={'flex justify-between items-center'}>
                  <Label htmlFor={'rank'} className={'text-base font-medium block mb-1'}>
                    Категория
                  </Label>
                  {error && <span className={'text-sm text-red-500'}>{error.message}</span>}
                </div>
                <Select
                  disabled={ranksFetching || ranks.length === 0}
                  value={registerMutation.rank}
                  onValueChange={(value) => handleCategoryChange(value)}
                >
                  <SelectTrigger id={'rank'} className={`${errors.rank && errorStyles}`}>
                    <SelectValue placeholder='Выберите вашу категорию' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ranks.map((item) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <Button
            onClick={handleNextStep}
            type={step !== 3 ? 'button' : 'submit'}
            className={'w-full h-14 bg-[#232A2E] flex justify-between px-10 font-bold mb-2.5'}
          >
            {step === 3 ? 'Зарегистрироваться' : 'Далее'}
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
            У вас уже есть аккаунт?
          </Link>

          <Link to={'/register'}>
            <Button
              type={'button'}
              className={
                'bg-[#D9EBC6] text-[#3F6A11] shadow-none w-full h-12 uppercase rounded-full hover:bg-[#C8E1B1]'
              }
            >
              Войти
            </Button>
          </Link>
        </section>
      </form>
    </div>
  );
};
