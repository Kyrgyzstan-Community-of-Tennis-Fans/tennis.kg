import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { UsersInput } from '@/features/users/components/UsersInput/UsersInput';
import { selectForgotPasswordError, selectForgotPasswordLoading } from '@/features/users/usersSlice';
import { forgotPassword } from '@/features/users/usersThunks';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import React, { type ChangeEvent, type FormEvent, useState } from 'react';
import { toast } from 'sonner';

export const ForgotPassword: React.FC = () => {
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

  return (
    <form onSubmit={handleSubmit}>
      <section
        className='absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-full py-10 mx-auto px-6 xs:max-w-[545px] xs:py-12 xs:px-10 rounded-3xl'
        style={{ boxShadow: '0px 4px 100px 0px #00000017' }}
      >
        <div className='mb-3'>
          <h1 className='font-bold text-[28px]'>Сброс пароля.</h1>
          <p className='text-sm text-black/75'>Пожалуйста, введите вашу почту для сброса пароля.</p>
        </div>

        <div className={'space-y-3 mb-5'}>
          <UsersInput
            id='email'
            value={email}
            onChange={handleChange}
            label='Почта'
            placeholder='Введите вашу почту'
            type='email'
            autoComplete='email'
          />
        </div>

        <Button
          disabled={email.length === 0 || forgotPasswordLoading}
          type={'submit'}
          className={'w-full h-14 bg-[#232A2E] flex justify-between px-10 font-bold mb-2.5'}
        >
          Отправить ссылку на сброс пароля
          {forgotPasswordLoading ? (
            <Loader className={'text-muted'} />
          ) : (
            <ArrowRightIcon style={{ width: 20, height: 20 }} />
          )}
        </Button>
      </section>
    </form>
  );
};
