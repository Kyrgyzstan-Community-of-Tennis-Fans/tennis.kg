import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { selectCategories, selectCategoriesFetching } from '@/features/category/categorySlice';
import { fetchCategories } from '@/features/category/categoryThunks';
import { UsersInput } from '@/features/users/components/UsersInput/UsersInput';
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
  category: '',
  fullName: '',
  gender: '',
  dateOfBirth: '',
  email: '',
};

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRegisterLoading);
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [registerMutation, setRegisterMutation] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isRulesChecked, setIsRulesChecked] = useState({
    rules: false,
    personalData: false,
  });

  useEffect(() => {
    if (error && error.errors) {
      Object.values(error.errors).forEach((err) => {
        toast.error(err.message);
      });
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '');

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

    updateRegisterField('dateOfBirth', formattedDate);
  };

  const handleRulesChange = (value: boolean, id: string) => {
    setIsRulesChecked((prev) => ({ ...prev, [id]: value }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === 'telephone') {
      const digitsOnly = value.replace(/\D/g, '');
      let formattedPhone = digitsOnly;

      if (digitsOnly.length > 1) {
        formattedPhone = '0' + digitsOnly.slice(1, 4);
      }
      if (digitsOnly.length > 4) {
        formattedPhone += ' ' + digitsOnly.slice(4, 7);
      }
      if (digitsOnly.length > 7) {
        formattedPhone += ' ' + digitsOnly.slice(7, 10);
      }

      setRegisterMutation((prev) => ({ ...prev, telephone: formattedPhone }));
      return;
    }

    updateRegisterField(id, value);
  };

  const handleSelectChange = (value: string, id: string) => {
    const field = id === 'gender' ? 'gender' : 'category';
    updateRegisterField(field, value);
  };

  const updateRegisterField = (field: string, value: string) => {
    setRegisterMutation((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    const isFilled =
      Object.values(registerMutation).every((value) => value.trim() !== '') && confirmPassword.trim() !== '';
    const passwordsMatch = registerMutation.password === confirmPassword;
    const isRulesAccepted = Object.values(isRulesChecked).every((value) => value);

    return isFilled && passwordsMatch && isRulesAccepted;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(register(registerMutation)).unwrap();
    setRegisterMutation(initialState);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <section
        className='w-full my-14 py-10 mx-auto px-6 xs:max-w-[545px] xs:py-12 xs:px-10 rounded-3xl'
        style={{ boxShadow: '0px 4px 100px 0px #00000017' }}
      >
        <div className='mb-3'>
          <h1 className='font-bold text-[28px]'>Создать аккаунт.</h1>
          <p className='text-sm text-black/75'>Пожалуйста, заполните все данные для создания аккаунта.</p>
        </div>

        <div className='space-y-3 mb-8'>
          <UsersInput
            id='telephone'
            value={registerMutation.telephone}
            onChange={handleChange}
            label='Номер телефона'
            placeholder={'0500 000 000'}
            autoComplete={'tel'}
          />

          <UsersInput
            id='email'
            value={registerMutation.email}
            onChange={handleChange}
            label='Почта'
            placeholder={'example@gmail.com'}
            autoComplete={'email'}
          />

          <UsersInput
            id='password'
            value={registerMutation.password}
            onChange={handleChange}
            label='Пароль'
            placeholder='Введите пароль'
            type='password'
            autoComplete='new-password'
          />

          <UsersInput
            id='confirm-password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label='Подтвердите пароль'
            type='password'
            placeholder='Введите пароль еще раз'
            autoComplete='current-password'
            className={`${confirmPassword !== registerMutation.password && 'ring-red-500 ring-1 focus-visible:ring-red-500'} h-12 focus-visible:ring-[#80BC41]`}
            error={confirmPassword !== registerMutation.password ? 'Пароли не совпадают' : ''}
          />

          <UsersInput
            id='dateOfBirth'
            value={registerMutation.dateOfBirth}
            onChange={handleDateChange}
            label='Дата рождения'
            placeholder='15.10.2007'
            autoComplete='bday'
          />

          <UsersInput
            id='fullName'
            value={registerMutation.fullName}
            onChange={handleChange}
            label='ФИО'
            placeholder='Введите ваше полное ФИО'
            autoComplete='name'
          />

          <div>
            <Label htmlFor='gender'>Пол</Label>
            <Select value={registerMutation.gender} onValueChange={(value) => handleSelectChange(value, 'gender')}>
              <SelectTrigger className={'h-12 focus:ring-[#80BC41]'} id='gender'>
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

          <div>
            <Label htmlFor='category'>Категория</Label>
            <Select
              disabled={categoriesFetching || categories.length === 0}
              value={registerMutation.category}
              onValueChange={(value) => handleSelectChange(value, 'category')}
            >
              <SelectTrigger className={'h-12 focus:ring-[#80BC41]'} id='category'>
                <SelectValue placeholder='Выберите вашу категорию' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((item) => (
                    <SelectItem key={item._id} value={item._id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className={'space-y-2'}>
            <div className={'flex items-center gap-2'}>
              <Checkbox
                onCheckedChange={(value) => handleRulesChange(Boolean(value), 'rules')}
                id={'rules'}
                className={'size-4'}
              />
              <Label htmlFor={'rules'} className={'font-normal'}>
                Ознакомился с правилами КСЛТ
              </Label>
            </div>

            <div className={'flex items-center gap-2'}>
              <Checkbox
                onCheckedChange={(value) => handleRulesChange(Boolean(value), 'personalData')}
                id={'personalData'}
                className={'size-4'}
              />
              <Label htmlFor={'personalData'} className={'font-normal'}>
                Даю согласие на обработку персональных данных
              </Label>
            </div>
          </div>
        </div>

        <Button
          type='submit'
          className='w-full h-14 bg-[#232A2E] flex justify-between px-10 font-bold mb-2.5'
          disabled={!isFormValid()}
        >
          Зарегистрироваться
          {loading ? <Loader /> : <ArrowLongRightIcon style={{ width: 40, height: 40 }} strokeWidth={1} />}
        </Button>

        <Link to='/login' className='text-sm block text-center text-black/50 w-fit mx-auto'>
          Уже зарегистрированы? <span className='font-medium text-black'>Войдите</span>
        </Link>
      </section>
    </form>
  );
};
