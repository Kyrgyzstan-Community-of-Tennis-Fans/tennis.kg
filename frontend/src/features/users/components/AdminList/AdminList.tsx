import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminRedactor from '@/features/users/components/AdminRedactor/AdminRedactor';
import { CustomPagination } from '@/components/CustomPagination/CustomPagination';
import { Layout } from '@/components/Layout';
import React, { ChangeEvent, useState } from 'react';
import type { UsersFilter } from '@/types/user';
import { useCategory } from '@/features/category/hooks/useCategory';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUsersList, selectUsersListPages } from '@/features/users/usersSlice';
import { fetchUsers } from '@/features/users/usersThunks';
import { formatTelephone } from '@/lib/formatTelephone';
import { useDebounce } from 'react-use';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

export const AdminList = () => {
  const [filters, setFilters] = useState<UsersFilter>({
    telephone: '',
    fullName: '',
    category: 'all',
    page: 1,
    role: 'moderator',
  });

  const { categories, categoriesFetching } = useCategory();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersList);
  const totalPages = useAppSelector(selectUsersListPages);

  useDebounce(
    () => {
      dispatch(fetchUsers(filters));
    },
    300,
    [filters],
  );

  const handleFiltersChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    let value = event.target.value;

    if (name === 'fullName') {
      if (filters.fullName?.trim() === '' && value.trim() === '') {
        toast.error('Нельзя ввести пустое поле.');
        return;
      }
    }

    if (name === 'telephone') {
      if (filters.telephone?.trim() === '' && value.trim() === '') {
        toast.error('Нельзя ввести пустое поле.');
        return;
      } else {
        value = formatTelephone(value);
      }
    }

    if (name === 'telephone') {
      value = formatTelephone(value);
    }

    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
      page: 1,
    }));
  };

  const handleCategoryFilterChange = (category: string) => {
    setFilters((prevState) => ({
      ...prevState,
      category,
      page: 1,
    }));
  };

  const handleResetFilters = async () => {
    setFilters({
      telephone: '',
      fullName: '',
      category: 'all',
      page: 1,
      role: 'moderator',
    });

    await dispatch(fetchUsers(filters));
  };

  return (
    <Layout>
      <div className={'flex gap-4 mb-4 flex-col md:flex-row'}>
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

        <Button
          variant={'outline'}
          onClick={handleResetFilters}
          className='filter-set-date h-9 ms-auto text-cr-green-900 hover:text-rose-700 dark:text-green-500'
        >
          Сбросить
          <XIcon />
        </Button>
      </div>

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
                <TableCell className={'w-[12.5%]'}>{user.isActive ? 'Активен' : 'Неактивен'}</TableCell>
                <TableCell className={'w-[12.5%]'}>{user.email}</TableCell>
                <TableCell className={'w-[12.5%]'}>{user.telephone}</TableCell>
                <TableCell className={'w-[12.5%]'}>{user.fullName}</TableCell>
                <TableCell className={'w-[12.5%]'}>{user.gender === 'male' ? 'Муж.' : 'Жен.'}</TableCell>
                <TableCell className={'w-[12.5%]'}>{user.dateOfBirth}</TableCell>
                <TableCell className={'w-[12.5%]'}>{user.category.name}</TableCell>
                <TableCell className={'w-[160px] flex gap-2'}>
                  <AdminRedactor filters={filters} id={user._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <CustomPagination
        page={filters.page}
        total={totalPages}
        setPage={(page = filters.page) => setFilters((prevState) => ({ ...prevState, page }))}
      />
    </Layout>
  );
};
