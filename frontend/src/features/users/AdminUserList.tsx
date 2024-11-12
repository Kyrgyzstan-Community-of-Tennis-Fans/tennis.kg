import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { InfoTip } from '@/components/Confirm/InfoTip/InfoTip';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCategory } from '@/features/category/hooks/useCategory';
import { AdminRedactor } from '@/features/users/components/AdminRedactor/AdminRedactor';
import { selectUsersList } from '@/features/users/usersSlice';
import { fetchUsers, updateIsActive } from '@/features/users/usersThunks';
import { formatTelephone } from '@/lib/formatTelephone';
import type { UsersFilter } from '@/types/userTypes';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { type ChangeEvent, useEffect, useState } from 'react';

export const AdminUserList = () => {
  const [filters, setFilters] = useState<UsersFilter>({
    telephone: '',
    fullName: '',
    category: '',
  });
  const { categories, categoriesFetching } = useCategory();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersList);

  useEffect(() => {
    dispatch(fetchUsers(filters));
  }, [dispatch, filters]);

  const toggleActive = async (id: string) => {
    await dispatch(updateIsActive(id));
    await dispatch(fetchUsers(filters));
  };

  const handleFiltersChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    let value = event.target.value;

    if (name === 'telephone') {
      value = formatTelephone(value);
    }

    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryFilterChange = (category: string) => {
    setFilters((prevState) => ({
      ...prevState,
      category,
    }));
  };

  return (
    <Layout>
      <div className={'flex gap-4 mb-4'}>
        <Input
          placeholder={'Поиск по ФИО…'}
          value={filters.fullName}
          name={'fullName'}
          onChange={handleFiltersChange}
        />

        <Input
          placeholder={'Поиск по номеру телефона…'}
          value={filters.telephone}
          type={'tel'}
          name={'telephone'}
          onChange={handleFiltersChange}
        />

        <Select value={filters.category} onValueChange={handleCategoryFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder={'Выберите категорию…'} />
          </SelectTrigger>
          <SelectContent>
            {categoriesFetching ? (
              <SelectItem disabled value={'null'}>
                Загрузка…
              </SelectItem>
            ) : !categoriesFetching && categories.length === 0 ? (
              <SelectItem disabled value={'null'}>
                Список категорий пуст
              </SelectItem>
            ) : (
              <>
                <SelectItem value={'all'}>Все</SelectItem>

                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className={'h-[500px]'}>
        {users.length === 0 ? (
          <p className={'text-center text-muted-foreground mt-10'}>Список пользователей пуст…</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Статус</TableHead>
                <TableHead>Почта</TableHead>
                <TableHead>Номер телефона</TableHead>
                <TableHead>ФИО</TableHead>
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
                  <TableCell className={'w-[90px] flex gap-2'}>
                    <AdminRedactor filters={filters} id={user._id} />
                    {user.isActive ? (
                      <InfoTip text={'Деактивировать'} delay={300} className={'border border-muted-foreground'}>
                        <Button
                          size={'icon'}
                          className={'font-normal'}
                          variant='destructive'
                          onClick={() => toggleActive(user._id)}
                        >
                          <XMarkIcon className={'size-4'} />
                        </Button>
                      </InfoTip>
                    ) : (
                      <InfoTip text={'Активировать'} className={'border border-muted-foreground'} delay={300}>
                        <Button
                          className={'p-2 text-white hover:bg-green-600 font-normal rounded-lg bg-green-500'}
                          onClick={() => toggleActive(user._id)}
                        >
                          <CheckIcon className={'size-4'} />
                        </Button>
                      </InfoTip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </ScrollArea>
    </Layout>
  );
};
