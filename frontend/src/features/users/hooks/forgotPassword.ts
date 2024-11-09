import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectForgotPasswordError, selectForgotPasswordLoading } from '@/features/users/usersSlice';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import { forgotPassword } from '@/features/users/usersThunks';
import { toast } from 'sonner';

export const useForgotPassword = () => {
  const dispatch = useAppDispatch();
  const forgotError = useAppSelector(selectForgotPasswordError);
  const forgotPasswordLoading = useAppSelector(selectForgotPasswordLoading);
  const [email, setEmail] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      await dispatch(forgotPassword(email)).unwrap();
      toast.success('Ссылка для сброса пароля отправлена на вашу почту.');
    } catch (error) {
      console.error(error);
      toast.error(forgotError?.error || 'Что-то пошло не так.');
    }
  };

  return {
    forgotError,
    forgotPasswordLoading,
    email,
    handleChange,
    handleSubmit,
  };
};
