import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { InfoTip } from '@/components/Confirm/InfoTip/InfoTip';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCategory } from '@/features/category/hooks/useCategory';
import AdminRedactor from '@/features/users/components/AdminRedactor/AdminRedactor';
import { selectUsersList, selectUsersListPages } from '@/features/users/usersSlice';
import { fetchUsers, updateIsActive } from '@/features/users/usersThunks';
import { formatTelephone } from '@/lib/formatTelephone';
import type { UsersFilter } from '@/types/user';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { type ChangeEvent, useState } from 'react';
import { CustomPagination } from '@/components/CustomPagination/CustomPagination';
import { useDebounce } from 'react-use';
import { toast } from 'sonner';
import { XIcon } from 'lucide-react';
import * as React from 'react';

export const UsersList = () => {
  const [filters, setFilters] = useState<UsersFilter>({
    telephone: '',
    fullName: '',
    category: 'all',
    page: 1,
    role: 'user',
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

  const toggleActive = async (id: string) => {
    await dispatch(updateIsActive(id));
    await dispatch(fetchUsers(filters));
  };

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
      role: 'user',
    });

    await dispatch(fetchUsers(filters));
  };

  return (
    users && (
      <Layout>
        <div className={'flex gap-4 mb-4 flex-col md:flex-row'}>
          <Input
            id='fullName'
            placeholder={'Поиск по ФИО'}
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
                          size={'icon'}
                          className={'p-3 text-white hover:bg-green-600 font-normal bg-green-500'}
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
        <CustomPagination
          page={filters.page}
          total={totalPages}
          setPage={(page = filters.page) => setFilters((prevState) => ({ ...prevState, page }))}
        />
      </Layout>
    )
  );
};
