import {useAppDispatch, useAppSelector} from '@/app/hooks';
import {selectLoginError, selectLoginLoading} from '@/features/users/usersSlice';
import {useNavigate} from 'react-router-dom';
import {type ChangeEvent, type FormEvent, useState} from 'react';
import {login} from '@/features/users/usersThunks';
import type {LoginMutation} from '@/types/userTypes';

const initialState: LoginMutation = {
  telephone: '',
  password: '',
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectLoginError);
  const navigate = useNavigate();
  const [loginMutation, setLoginMutation] = useState(initialState);

  const translatedError = error?.error === 'Username not found!' ? 'Неверный номер телефона или пароль' : error?.error;

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

  return {
    loading,
    error,
    navigate,
    loginMutation,
    translatedError,
    isButtonDisabled,
    setLoginMutation,
    handleChange,
    handleSubmit
  };
};