import React, {useEffect} from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { AdminRedactor } from '@/features/users/components/AdminRedactor/AdminRedactor';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectUsersList} from "@/features/users/usersSlice";
import {fetchUsers, updateIsActive} from "@/features/users/usersThunks";
import {ScrollArea} from "@/components/ui/scroll-area";

export const AdminUserList = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersList);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const toggleActive = async (id: string) => {
    await dispatch(updateIsActive(id));
    await dispatch(fetchUsers());
  };

  return users && (
      <Layout>
          <ScrollArea className={'h-[500px]'}>
            <Table>
              <TableCaption>A list of all users.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Статус</TableHead>
                  <TableHead>Почта</TableHead>
                  <TableHead>Номер телефона</TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Пол</TableHead>
                  <TableHead>Год рождения</TableHead>
                  <TableHead>Категория</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className={'w-[125px]'}>{user.isActive ? 'Активен' : 'Неактивен'}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.telephone}</TableCell>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.gender === 'male' ? 'Муж.' : 'Жен.'}</TableCell>
                      <TableCell>{user.dateOfBirth}</TableCell>
                      <TableCell>{user.category.name}</TableCell>
                      <TableCell className={'w-[100px]'}>
                        <AdminRedactor id={user._id}/>
                      </TableCell>
                      {user.isActive ? (
                          <TableCell className={'w-[100px]'}>
                            <Button variant='destructive' className={'w-[130px]'}
                                    onClick={() => toggleActive(user._id)}>
                              Деактивировать
                            </Button>
                          </TableCell>
                      ) : (
                          <TableCell className={'w-[100px]'}>
                            <button
                                className={'p-2 text-white w-[130px] rounded-lg bg-green-500'}
                                onClick={() => toggleActive(user._id)}
                            >
                              Активировать
                            </button>
                          </TableCell>
                      )}
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
      </Layout>
);
};
