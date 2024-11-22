import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { UsersList } from '@/features/users/components/UsersList/UsersList';
import { Layout } from '@/components/Layout';
import { AdminList } from '@/features/users/components/AdminList/AdminList';
import { useAppSelector } from '@/app/hooks';
import { selectUserPermission } from '@/features/users/usersSlice';

export const AdminUsers = () => {
  const userPermission = useAppSelector(selectUserPermission);
  return (
    <Layout>
      <Tabs defaultValue='users' orientation={'vertical'}>
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
