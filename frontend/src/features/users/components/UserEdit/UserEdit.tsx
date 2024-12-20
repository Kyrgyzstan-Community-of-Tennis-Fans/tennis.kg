import React, { type ChangeEvent, type FormEvent, type PropsWithChildren, useEffect, useRef, useState } from 'react';
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
import { selectUpdating } from '@/features/users/usersSlice';
import { fetchOneUser, updateUserInfo } from '@/features/users/usersThunks';
import { validateEmail } from '@/lib/emailValidate';
import { formatTelephone } from '@/lib/formatTelephone';
import type { RegisterMutationWithoutCoupleFields, User } from '@/types/user';
import { toast } from 'sonner';
import UserDatePicker from '@/features/users/components/UserDatePicker/UserDatePicker';
import { format } from 'date-fns';

const initialState: RegisterMutationWithoutCoupleFields = {
  telephone: '',
  fullName: '',
  gender: '',
  email: '',
  dateOfBirth: '',
};

interface Props {
  user: User;
}

export const UserEdit: React.FC<PropsWithChildren & Props> = ({ children, user }) => {
  const dispatch = useAppDispatch();
  const updatingUser = useAppSelector(selectUpdating);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [userInfoMutation, setUserInfoMutation] = useState<RegisterMutationWithoutCoupleFields>(initialState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUserInfoMutation({
        telephone: user.telephone,
        fullName: user.fullName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
      });
    }
  }, [user]);

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
    const field = id === 'gender' ? 'gender' : 'category';
    updateRegisterField(field, value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (user) {
      event.preventDefault();

      await dispatch(updateUserInfo(userInfoMutation)).unwrap();
      await dispatch(fetchOneUser(user._id));
      toast.success('Профиль успешно обновлен');
      closeRef.current?.click();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
