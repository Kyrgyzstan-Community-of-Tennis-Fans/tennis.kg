import { useAppSelector } from '@/app/hooks';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { UserEdit } from '@/features/users/components/UserEdit/UserEdit';
import { selectUser } from '@/features/users/usersSlice';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PersonalAccount: React.FC = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return;
  }

  return (
    <Layout>
      <header className={'flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'}>
        <div>
          <h1 className={'text-2xl font-medium leading-none'}>Личный кабинет</h1>
          <small className={'text-muted-foreground text-base'}>Ваша персональная информация и управление данными</small>
        </div>

        <UserEdit>
          <Button>
            Редактировать
            <PencilSquareIcon />
          </Button>
        </UserEdit>
      </header>

      <main className='mt-2 flex flex-col max-w-2xl'>
        <div className='mb-3 flex flex-col'>
          <h2 className='text-xl font-medium'>{user.fullName}</h2>
          <span className='text-[#64B32C]'>{user.category.name}</span>
        </div>

        <div className='space-y-2 flex flex-col'>
          <div className='flex flex-wrap'>
            <h3 className='font-medium w-full sm:w-1/3'>Почта</h3>
            <span className='text-muted-foreground w-full sm:w-2/3 break-words'>{user.email}</span>
          </div>

          <div className='flex flex-wrap'>
            <h3 className='font-medium w-full sm:w-1/3'>Телефон</h3>
            <span className='text-muted-foreground w-full sm:w-2/3'>{user.telephone}</span>
          </div>

          <div className='flex flex-wrap'>
            <h3 className='font-medium w-full sm:w-1/3'>День рождения</h3>
            <span className='text-muted-foreground w-full sm:w-2/3'>{user.dateOfBirth}</span>
          </div>

          <div className='flex flex-wrap'>
            <h3 className='font-medium w-full sm:w-1/3'>Пол</h3>
            <span className='text-muted-foreground w-full sm:w-2/3'>{user.gender === 'male' ? 'Муж.' : 'Жен.'}</span>
          </div>

          {user.role === 'admin' && (
            <div className='flex flex-wrap'>
              <h3 className='font-medium w-full sm:w-1/3'>Роль</h3>
              <span className='text-muted-foreground w-full sm:w-2/3'>
                {user.role === 'admin' ? 'Админ' : 'Пользователь'}
              </span>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};
