import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UsersInput } from '@/features/users/components/UsersInput/UsersInput';
import { validateEmail } from '@/lib/emailValidate';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '@/features/users/hooks/register';
import UserDatePicker from '@/features/users/components/UserDatePicker/UserDatePicker';

export const Register: React.FC = () => {
  const {
    loading,
    categories,
    categoriesFetching,
    registerMutation,
    confirmPassword,
    setConfirmPassword,
    handleDateChange,
    handleSelectChange,
    handleRulesChange,
    handleChange,
    isFormValid,
    handleSubmit,
  } = useRegister();

  return (
    <form onSubmit={handleSubmit}>
      <section
        className='w-full my-14 py-10 mx-auto px-6 xs:max-w-[545px] xs:py-12 xs:px-10 rounded-3xl dark:border-2  dark:border-green-400'
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
            value={registerMutation.telephone}
            onChange={handleChange}
            label='Номер телефона'
            placeholder={'0500 000 000'}
            autoComplete={'tel'}
          />

          <UsersInput
            id='email'
            value={registerMutation.email}
            onChange={handleChange}
            label='Почта'
            placeholder={'example@gmail.com'}
            autoComplete={'email'}
          />

          <UsersInput
            id='password'
            value={registerMutation.password}
            onChange={handleChange}
            label='Пароль'
            placeholder='Введите пароль'
            type='password'
            autoComplete='new-password'
          />

          <UsersInput
            id='confirm-password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label='Подтвердите пароль'
            type='password'
            placeholder='Введите пароль еще раз'
            autoComplete='current-password'
            className={`${confirmPassword !== registerMutation.password && 'border-[#eb3434] focus-visible:border-[#eb3434]'} h-12 focus-visible:border-[#80BC41]`}
            error={confirmPassword !== registerMutation.password ? 'Пароли не совпадают' : ''}
          />

          <UserDatePicker
            value={registerMutation.dateOfBirth}
            onChange={(date) => handleDateChange(date)}
            label={'Дата рождения'}
          />

          <UsersInput
            id='fullName'
            value={registerMutation.fullName}
            onChange={handleChange}
            label='ФИО'
            placeholder='Введите ваше полное ФИО'
            autoComplete='name'
          />

          <div>
            <Label htmlFor='gender' className={'text-base font-medium block'}>
              Пол
            </Label>
            <Select value={registerMutation.gender} onValueChange={(value) => handleSelectChange(value, 'gender')}>
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
              value={registerMutation.category}
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

          <div className={'space-y-2'}>
            <div className={'flex items-center gap-2'}>
              <Checkbox
                onCheckedChange={(value) => handleRulesChange(Boolean(value), 'rules')}
                id={'rules'}
                className={'size-4'}
              />
              <Label htmlFor={'rules'} className={'font-normal'}>
                Ознакомился с правилами КСЛТ
              </Label>
            </div>

            <div className={'flex items-center gap-2'}>
              <Checkbox
                onCheckedChange={(value) => handleRulesChange(Boolean(value), 'personalData')}
                id={'personalData'}
                className={'size-4'}
              />
              <Label htmlFor={'personalData'} className={'font-normal'}>
                Даю согласие на обработку персональных данных
              </Label>
            </div>
          </div>
        </div>

        <Button
          type='submit'
          className='w-full h-14 bg-[#232A2E] flex justify-between px-10 font-bold mb-2.5 dark:bg-blue-50'
          disabled={!isFormValid() || !validateEmail(registerMutation.email)}
        >
          Зарегистрироваться
          {loading ? <Loader /> : <ArrowLongRightIcon style={{ width: 40, height: 40 }} strokeWidth={1} />}
        </Button>

        <Link to='/login' className='text-sm block text-center text-black/50 w-fit mx-auto'>
          Уже зарегистрированы? <span className='font-medium text-black'>Войдите</span>
        </Link>
      </section>
    </form>
  );
};
