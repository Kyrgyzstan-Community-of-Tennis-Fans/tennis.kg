import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { UsersInput } from '@/features/users/components/UsersInput/UsersInput';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import React from 'react';
import {useForgotPassword} from '@/features/users/hooks/forgotPassword';

export const ForgotPassword: React.FC = () => {

  const {
    forgotPasswordLoading,
    email,
    handleChange,
    handleSubmit
  } = useForgotPassword();

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
