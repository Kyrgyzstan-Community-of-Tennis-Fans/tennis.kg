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
import { selectCurrentUser, selectUpdating } from '@/features/users/usersSlice';
import { fetchOneUser, fetchUsers, updateCurrentUserInfo } from '@/features/users/usersThunks';
import { validateEmail } from '@/lib/emailValidate';
import { formatDateOfBirth } from '@/lib/formatDateOfBirth';
import { formatTelephone } from '@/lib/formatTelephone';
import type { RedactorForAdmin, UsersFilter } from '@/types/userTypes';
import React, { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { selectCategories, selectCategoriesFetching } from '@/features/category/categorySlice';
import { fetchCategories } from '@/features/category/categoryThunks';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const initialState: RedactorForAdmin = {
  id: '',
  category: '',
  telephone: '',
  fullName: '',
  gender: '',
  email: '',
  dateOfBirth: '',
};

export interface Props {
  id: string;
  filters: UsersFilter;
}

export const AdminRedactor: React.FC<Props> = ({ id }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);
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

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = formatDateOfBirth(event.target.value);

    updateRegisterField('dateOfBirth', date);
  };

  const handleSelectChange = (value: string, id: string) => {
    const field = id === 'gender' ? 'gender' : 'category';
    updateRegisterField(field, value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (currentUser) {
      event.preventDefault();

      await dispatch(updateCurrentUserInfo(userInfoMutation)).unwrap();
      await dispatch(fetchUsers());
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
              placeholder='Введите ваше полное ФИО'
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

            <UsersInput
              id='dateOfBirth'
              value={userInfoMutation.dateOfBirth}
              onChange={handleDateChange}
              label='Дата рождения'
              placeholder='15.10.2007'
              autoComplete='bday'
            />

            <div>
              <Label htmlFor='gender' className={'text-base text-left font-medium block'}>
                Пол
              </Label>
              <Select value={userInfoMutation.gender} onValueChange={(value) => handleSelectChange(value, 'gender')}>
                <SelectTrigger className={'h-12 focus:ring-[#80BC41]'} id='gender'>
                  <SelectValue placeholder='Укажите ваш пол' />
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
                  <SelectValue placeholder='Выберите вашу категорию' />
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
