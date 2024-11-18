import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RewardCard } from '@/components/FileInput/RewardCard/RewardCard';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { UserEdit } from '@/features/users/components/UserEdit/UserEdit';
import { selectCurrentUser, selectUser } from '@/features/users/usersSlice';
import { fetchOneUser } from '@/features/users/usersThunks';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserInfoProps {
  label: string;
  value: string;
}

const UserInfo = ({ label, value }: UserInfoProps) => (
  <div className='flex flex-wrap'>
    <h3 className='font-medium w-full sm:w-1/3'>{label}</h3>
    <span className='text-muted-foreground w-full sm:w-2/3 break-words'>{value}</span>
  </div>
);

export const PersonalAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const currentUser = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
    else dispatch(fetchOneUser(user._id));
  }, [dispatch, user, navigate]);

  if (!currentUser) return null;

  const { fullName, category, email, telephone, dateOfBirth, gender, role } = currentUser;

  return (
    <Layout>
      <header className='flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'>
        <div>
          <h1 className='text-2xl font-medium leading-none'>Личный кабинет</h1>
          <small className='text-muted-foreground text-base'>Ваша персональная информация и управление данными</small>
        </div>

        <UserEdit user={currentUser}>
          <Button>
            Редактировать <PencilSquareIcon className='ml-2' />
          </Button>
        </UserEdit>
      </header>

      <main className='mt-2 grid grid-cols-2'>
        <section>
          <div className='mb-3 flex flex-col'>
            <h2 className='text-xl font-medium'>{fullName}</h2>
            <span className='text-[#64B32C]'>{category.name}</span>
          </div>

          <div className='space-y-2 flex flex-col'>
            <UserInfo label='Почта' value={email} />
            <UserInfo label='Телефон' value={telephone} />
            <UserInfo label='День рождения' value={dateOfBirth} />
            <UserInfo label='Пол' value={gender === 'male' ? 'Муж.' : 'Жен.'} />

            {role === 'admin' && <UserInfo label='Роль' value='Админ' />}
          </div>
        </section>
        <section>
          <div className='mb-3 flex flex-col'>
            <h2 className='text-xl font-medium'>Награды</h2>
            <span className={'text-muted-foreground text-sm'}>Список ваших наград</span>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            {currentUser.rewards.map((item) => (
              <RewardCard key={item._id} item={item} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};
