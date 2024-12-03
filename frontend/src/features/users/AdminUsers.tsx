import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { UsersList } from '@/features/users/components/UsersList/UsersList';
import { Layout } from '@/components/Layout';
import { AdminList } from '@/features/users/components/AdminList/AdminList';
import { useAppSelector } from '@/app/hooks';
import { selectUserPermission } from '@/features/users/usersSlice';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { AddUserForm } from '@/features/users/components/AddUserForm/AddUserForm';

export const AdminUsers = () => {
  const userPermission = useAppSelector(selectUserPermission);
  const [currentTab, setCurrentTab] = useState<string>('users');

  useEffect(() => {
    const savedTab = sessionStorage.getItem('listOfUsersTab');
    if (savedTab) {
      setCurrentTab(savedTab);
    }
  }, []);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    sessionStorage.setItem('listOfUsersTab', newTab);
  };
  return (
    <Layout>
      <header className={'flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5 mb-7'}>
        <div>
          <h1 className={'text-2xl font-medium leading-none'}>Пользователи</h1>
          <small className={'text-muted-foreground text-base'}>
            Список всех пользователей и управление пользователями.
          </small>
        </div>
        {userPermission === 3 && (
          <AddUserForm className={'w-full xs:w-max'} setCurrentTab={(tab) => setCurrentTab(tab)}>
            Добавить пользователя <SquaresPlusIcon />
          </AddUserForm>
        )}
      </header>
      <Tabs value={currentTab} onValueChange={handleTabChange} orientation={'vertical'} defaultValue={'users'}>
        <ScrollArea className={'max-w-max pb-3 mx-auto'}>
          <TabsList className='flex items-center gap-1'>
            <TabsTrigger value='users'>Пользователи</TabsTrigger>
            {userPermission === 3 && <TabsTrigger value='moderators'>Модераторы</TabsTrigger>}
          </TabsList>
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
        <TabsContent value={'users'}>
          <UsersList />
        </TabsContent>
        {userPermission === 3 && (
          <TabsContent value={'moderators'}>
            <AdminList />
          </TabsContent>
        )}
      </Tabs>
    </Layout>
  );
};
