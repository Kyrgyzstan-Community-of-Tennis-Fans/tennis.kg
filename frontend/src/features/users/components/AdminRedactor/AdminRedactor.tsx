import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UsersInput } from '@/features/users/components/UsersInput/UsersInput';
import { selectCurrentUser, selectUpdating, selectUserPermission } from '@/features/users/usersSlice';
import { fetchOneUser, fetchUsers, updateCurrentUserInfo } from '@/features/users/usersThunks';
import { validateEmail } from '@/lib/emailValidate';
import { formatTelephone } from '@/lib/formatTelephone';
import type { RedactorForAdmin, UsersFilter } from '@/types/user';
import React, { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { selectCategories, selectCategoriesFetching } from '@/features/category/categorySlice';
import { fetchCategories } from '@/features/category/categoryThunks';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import UserDatePicker from '@/features/users/components/UserDatePicker/UserDatePicker';
import {format} from "date-fns";

const initialState: RedactorForAdmin = {
  id: '',
  category: '',
  telephone: '',
  fullName: '',
  gender: '',
  email: '',
  dateOfBirth: '',
  role: '',
};

export interface Props {
  id: string;
  filters: UsersFilter;
}

const AdminRedactor: React.FC<Props> = ({ id, filters }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);
  const userPermission = useAppSelector(selectUserPermission);
  const updatingUser = useAppSelector(selectUpdating);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [userInfoMutation, setUserInfoMutation] = useState<RedactorForAdmin>(initialState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (isDialogOpen) {
      dispatch(fetchCategories());
      dispatch(fetchOneUser(id));
    }
  }, [dispatch, isDialogOpen, id]);

  useEffect(() => {
    if (currentUser) {
      setUserInfoMutation({
        id: currentUser._id,
        telephone: currentUser.telephone,
        fullName: currentUser.fullName,
        email: currentUser.email,
        category: currentUser.category._id,
        dateOfBirth: currentUser.dateOfBirth,
        gender: currentUser.gender,
        role: currentUser.role,
      });
    }
  }, [currentUser]);

  const updateRegisterField = (field: string, value: string) => {
    setUserInfoMutation((prev) => ({ ...prev, [field]: value }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === 'telephone') {
      const formattedPhone = formatTelephone(value);

      setUserInfoMutation((prev) => ({ ...prev, telephone: formattedPhone }));
      return;
    }

    updateRegisterField(id, value);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, 'dd.MM.yyyy');
      updateRegisterField('dateOfBirth', formattedDate);
    }
  };

  const handleSelectChange = (value: string, id: string) => {
    let field: string;
    if (id === 'gender') {
      field = id;
    } else if (id === 'category') {
      field = id;
    } else if (id === 'role') {
      field = id;
    }

    updateRegisterField(field, value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (currentUser) {
      event.preventDefault();

      await dispatch(updateCurrentUserInfo(userInfoMutation)).unwrap();
      await dispatch(fetchUsers(filters));
      setIsDialogOpen(false);
      toast.success('Профиль успешно обновлен');
      closeRef.current?.click();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className={'font-normal'} size={'icon'}>
          <PencilSquareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование профиля</DialogTitle>
          <DialogDescription>Заполните форму для редактирования профиля.</DialogDescription>

          <form onSubmit={handleSubmit} className={'flex flex-col gap-1.5'}>
            <UsersInput
              id='fullName'
              value={userInfoMutation.fullName}
              onChange={handleChange}
              label='ФИО'
              placeholder='Введите полное ФИО'
              autoComplete='name'
            />

            <UsersInput
              id='email'
              value={userInfoMutation.email}
              onChange={handleChange}
              label='Почта'
              placeholder={'example@gmail.com'}
              autoComplete={'email'}
            />

            <UsersInput
              id='telephone'
              value={userInfoMutation.telephone}
              onChange={handleChange}
              label='Номер телефона'
              placeholder={'0500 000 000'}
              autoComplete={'tel'}
            />

            <UserDatePicker
              value={userInfoMutation.dateOfBirth}
              onChange={(date) => handleDateChange(date)}
              label={'Дата рождения'}
            />

            <div>
              <Label htmlFor='gender' className={'text-base text-left font-medium block'}>
                Пол
              </Label>
              <Select value={userInfoMutation.gender} onValueChange={(value) => handleSelectChange(value, 'gender')}>
                <SelectTrigger className={'h-12 focus:ring-[#80BC41]'} id='gender'>
                  <SelectValue placeholder='Укажите пол' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='male'>Мужской</SelectItem>
                    <SelectItem value='female'>Женский</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor='category' className={'text-base font-medium block'}>
                Категория
              </Label>
              <Select
                disabled={categoriesFetching || categories.length === 0}
                value={userInfoMutation.category}
                onValueChange={(value) => handleSelectChange(value, 'category')}
              >
                <SelectTrigger className={'h-12 focus:ring-[#80BC41]'} id='category'>
                  <SelectValue placeholder='Выберите категорию' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((item) => (
                      <SelectItem key={item._id} value={item._id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor='role' className={'text-base text-left font-medium block'}>
                Пол
              </Label>
              <Select value={userInfoMutation.role} onValueChange={(value) => handleSelectChange(value, 'role')}>
                <SelectTrigger className={'h-12 focus:ring-[#80BC41]'} id='role'>
                  <SelectValue placeholder='Укажите роль' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='user'>Пользователь</SelectItem>
                    {userPermission === 3 && <SelectItem value='moderator'>Модератор</SelectItem>}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className={'flex flex-col gap-1 mt-1'}>
              <Button type={'submit'} disabled={updatingUser || !validateEmail(userInfoMutation.email)}>
                Сохранить {updatingUser && <Loader theme={'light'} />}
              </Button>

              <DialogClose asChild>
                <Button ref={closeRef} className={'w-full'} type={'button'} variant={'outline'}>
                  Отменить
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(AdminRedactor);
