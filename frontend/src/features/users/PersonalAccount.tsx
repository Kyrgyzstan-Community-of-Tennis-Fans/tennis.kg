import { useAppSelector } from '@/app/hooks';
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
    <section>
      <header className={'flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'}>
        <div>
          <h1 className={'text-lg font-medium leading-none'}>Личный кабинет</h1>
          <small className={'text-muted-foreground'}>Ваша персональная информация и управление данными</small>
        </div>

        <UserEdit>
          <Button size={'sm'}>
            Редактировать
            <PencilSquareIcon />
          </Button>
        </UserEdit>
      </header>

      <main className={'mt-2'}>
        <div className={'mb-3'}>
          <h2 className={'text-xl font-medium'}>{user.fullName}</h2>
          <span className={'text-[#64B32C]'}>{user.category.name}</span>
        </div>

        <div className={'max-w-sm space-y-2'}>
          <div className={'grid grid-cols-2'}>
            <h3 className={'font-medium'}>Почта</h3>
            <span className={'text-muted-foreground'}>{user.email}</span>
          </div>

          <div className={'grid grid-cols-2'}>
            <h3 className={'font-medium'}>Телефон</h3>
            <span className={'text-muted-foreground'}>{user.telephone}</span>
          </div>

          <div className={'grid grid-cols-2'}>
            <h3 className={'font-medium'}>День рождение</h3>
            <span className={'text-muted-foreground'}>{user.dateOfBirth}</span>
          </div>

          <div className={'grid grid-cols-2'}>
            <h3 className={'font-medium'}>Пол</h3>
            <span className={'text-muted-foreground'}>{user.gender === 'male' ? 'Муж.' : 'Жен.'}</span>
          </div>

          {user.role === 'admin' && (
            <div className={'grid grid-cols-2'}>
              <h3 className={'font-medium'}>Роль</h3>
              <span className={'text-muted-foreground'}>{user.role === 'admin' ? 'Админ' : 'Пользователь'}</span>
            </div>
          )}
        </div>
      </main>
    </section>
  );
};
