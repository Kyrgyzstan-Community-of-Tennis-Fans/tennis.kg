import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { UsersInput } from '@/features/users/components/UsersInput/UsersInput';
import { selectResetPasswordError, selectResetPasswordLoading } from '@/features/users/usersSlice';
import { resetPassword } from '@/features/users/usersThunks';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import React, { type ChangeEvent, type FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useParams() as { token: string };
  const resetPasswordLoading = useAppSelector(selectResetPasswordLoading);
  const resetPasswordError = useAppSelector(selectResetPasswordError);
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setPasswords({ ...passwords, [id]: value });
  };

  const passwordMatch = passwords.password !== passwords.confirmPassword;

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      await dispatch(resetPassword({ password: passwords.password, token })).unwrap();
      toast.success('Пароль успешно изменен.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error(resetPasswordError?.error || 'Что-то пошло не так.');
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
          <p className='text-sm text-black/75'>Пожалуйста, введите ваш новый пароль для сброса.</p>
        </div>

        <div className={'space-y-3 mb-5'}>
          <UsersInput
            id='password'
            value={passwords.password}
            onChange={handleChange}
            label='Пароль'
            placeholder='Введите новый пароль'
            type='password'
            autoComplete='new-password'
          />

          <UsersInput
            id='confirmPassword'
            value={passwords.confirmPassword}
            onChange={handleChange}
            label='Подтвердите пароль'
            placeholder='Введите пароль еще раз'
            className={`${passwords.confirmPassword !== passwords.password && 'ring-red-500 ring-1 focus-visible:ring-red-500'} h-12 focus-visible:ring-[#80BC41]`}
            type='password'
            autoComplete='current-password'
            error={passwordMatch ? 'Пароли не совпадают' : ''}
          />
        </div>

        <Button
          disabled={passwordMatch || !passwords.password || resetPasswordLoading}
          type={'submit'}
          className={'w-full h-14 bg-[#232A2E] flex justify-between px-10 font-bold mb-2.5'}
        >
          Сбросить
          {resetPasswordLoading ? (
            <Loader className={'text-muted'} />
          ) : (
            <ArrowRightIcon style={{ width: 20, height: 20 }} />
          )}
        </Button>
      </section>
    </form>
  );
};
