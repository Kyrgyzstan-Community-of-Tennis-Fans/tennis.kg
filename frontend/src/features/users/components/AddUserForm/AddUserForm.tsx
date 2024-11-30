import { UsersInput } from '@/features/users/components/UsersInput/UsersInput';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { validateEmail } from '@/lib/emailValidate';
import { Loader } from '@/components/Loader/Loader';
import { ArrowLongRightIcon, SquaresPlusIcon } from '@heroicons/react/24/outline';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import type { RegisterMutation } from '@/types/user';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectRegisterError, selectRegisterLoading } from '@/features/users/usersSlice';
import { selectCategories, selectCategoriesFetching } from '@/features/category/categorySlice';
import { toast } from 'sonner';
import { fetchCategories } from '@/features/category/categoryThunks';
import { formatTelephone } from '@/lib/formatTelephone';
import { addUser, fetchUsers } from '@/features/users/usersThunks';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import UserDatePicker from '@/features/users/components/UserDatePicker/UserDatePicker';
import {format} from "date-fns";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

const initialState: RegisterMutation = {
  telephone: '',
  password: '',
  category: '',
  fullName: '',
  gender: '',
  dateOfBirth: '',
  email: '',
  role: '',
};

interface Props {
  setCurrentTab: (tab: string) => void;
}

export const AddUserForm: React.FC<Props> = ({ setCurrentTab }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRegisterLoading);
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);
  const error = useAppSelector(selectRegisterError);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [newUser, setNewUser] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (error && error.errors) {
      Object.values(error.errors).forEach((err) => {
        toast.error(err.message);
      });
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, 'dd.MM.yyyy');
      updateRegisterField('dateOfBirth', formattedDate);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === 'telephone') {
      const formattedPhone = formatTelephone(value);

      setNewUser((prev) => ({ ...prev, telephone: formattedPhone }));
      return;
    }

    updateRegisterField(id, value);
  };

  const handleSelectChange = (value: string, id: string) => {
    let field: string;
    if (id === 'role') {
      field = id;
    } else if (id === 'gender') {
      field = id;
    } else if (id === 'category') {
      field = id;
    }

    updateRegisterField(field, value);
  };

  const updateRegisterField = (field: string, value: string) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValidAdmin = () => {
    const isFilled =
      Object.values(newUser).every((value) => value.trim() !== '') &&
      confirmPassword.trim() !== '' &&
      newUser.telephone.length === 12 &&
      newUser.dateOfBirth.length === 10;
    const passwordsMatch = newUser.password === confirmPassword;

    return isFilled && passwordsMatch;
  };

  const addUserAdmin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(addUser(newUser)).unwrap();
    setCurrentTab(newUser.role + 's');
    await dispatch(
      fetchUsers({
        role: newUser.role,
      }),
    );
    setConfirmPassword('');
    setNewUser(initialState);
    toast.success('Профиль успешно создан');
    closeRef.current?.click();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className={'w-full xs:w-max'}>
          Добавить пользователя <SquaresPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className={'max-w-3xl'}>
        <ScrollArea className={'max-h-svh p-6 overflow-y-auto'}>
          <form onSubmit={addUserAdmin}>
            <section
                style={{ boxShadow: '0px 4px 100px 0px #00000017' }}
            >
              <div className='mb-3'>
                <h1 className='font-bold text-[28px]'>Создать аккаунт</h1>
                <p className='text-sm text-black/75 dark:text-white'>
                  Пожалуйста, заполните все данные для создания аккаунта
                </p>
              </div>

              <div className='space-y-3 mb-8'>
                <UsersInput
                    id='telephone'
                    value={newUser.telephone}
                    onChange={handleChange}
                    label='Номер телефона'
                    placeholder={'0500 000 000'}
                    autoComplete={'tel'}
                />

                <UsersInput
                    id='email'
                    value={newUser.email}
                    onChange={handleChange}
                    label='Почта'
                    placeholder={'example@gmail.com'}
                    autoComplete={'email'}
                />

                <UsersInput
                    id='password'
                    value={newUser.password}
                    onChange={handleChange}
                    label='Пароль'
                    placeholder='Введите пароль'
                    type='password'
                    autoComplete={'new-password'}
                />

                <UsersInput
                    id='confirm-password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label='Подтвердите пароль'
                    type='password'
                    autoComplete={'current-password'}
                    placeholder='Введите пароль еще раз'
                    className={`${confirmPassword !== newUser.password && 'ring-red-500 ring-1 focus-visible:ring-red-500'} h-12 focus-visible:ring-[#80BC41]`}
                    error={confirmPassword !== newUser.password ? 'Пароли не совпадают' : ''}
                />

                <UserDatePicker
                    value={newUser.dateOfBirth}
                    onChange={(date) => handleDateChange(date)}
                    label={'Дата рождения'}
                />

                <UsersInput
                    id='fullName'
                    value={newUser.fullName}
                    onChange={handleChange}
                    label='ФИО'
                    placeholder='Введите ваше полное ФИО'
                    autoComplete={'name'}
                />

                <div>
                  <Label htmlFor='gender' className={'text-base font-medium block'}>
                    Пол
                  </Label>
                  <Select value={newUser.gender} onValueChange={(value) => handleSelectChange(value, 'gender')}>
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
                      value={newUser.category}
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
                  <Label htmlFor='role' className={'text-base font-medium block'}>
                    Роль
                  </Label>
                  <Select value={newUser.role} onValueChange={(value) => handleSelectChange(value, 'role')}>
                    <SelectTrigger className={'h-12 focus:ring-[#80BC41]'} id='role'>
                      <SelectValue placeholder='Выберите роль' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={'user'}>Пользователь</SelectItem>
                        <SelectItem value={'moderator'}>Модератор</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                  type='submit'
                  className='w-full h-14 bg-[#232A2E] flex justify-between px-10 font-bold mb-2.5 dark:bg-blue-50'
                  disabled={!isFormValidAdmin() || !validateEmail(newUser.email)}
              >
                Добавить
                {loading ? <Loader /> : <ArrowLongRightIcon style={{ width: 40, height: 40 }} strokeWidth={1} />}
              </Button>

              <DialogClose asChild>
                <Button ref={closeRef} className={'w-full'} type={'button'} variant={'outline'}>
                  Отменить
                </Button>
              </DialogClose>
            </section>
          </form>
          <ScrollBar orientation={'vertical'}/>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
