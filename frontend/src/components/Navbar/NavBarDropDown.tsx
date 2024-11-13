import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import { ArrowRightStartOnRectangleIcon, Cog6ToothIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/features/users/usersThunks';
import './auth.css';
import { useEffect, useState } from 'react';

export const NavBarDropDown = () => {
  const user = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setDropDown(false);
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger onClick={() => setDropDown(true)}>
          <UserCircleIcon className='w-[24px] text-[#64B32C] h-[24px]' />
        </DropdownMenuTrigger>
        {dropDown && (
          <DropdownMenuContent>
            <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setDropDown(false)}>
              <Link className='flex items-center gap-1.5' to='/personal-account'>
                <UserIcon className='w-[15px] h-[15px]' />
                Личный кабинет
              </Link>
            </DropdownMenuItem>
            {user?.role === 'admin' && (
              <DropdownMenuItem onClick={() => setDropDown(false)}>
                <Link className='flex items-center gap-1.5' to='/admin'>
                  <Cog6ToothIcon className='w-[15px] h-[15px]' />
                  Панель администратора
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className='flex items-center gap-1.5'>
              <ArrowRightStartOnRectangleIcon />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  );
};
