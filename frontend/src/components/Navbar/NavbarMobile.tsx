import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavigationItems } from '@/components/Navbar/MenuItems';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectPermission, selectUser } from '@/features/users/usersSlice';
import { selectItemsData } from '@/features/footers/footersSlice';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './auth.css';
import { logout } from '@/features/users/usersThunks';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';

export const NavbarMobile = () => {
  const location = useLocation();
  const user = useAppSelector(selectUser);
  const permission = useAppSelector(selectPermission);
  const dispatch = useAppDispatch();
  const footerItemsData = useAppSelector(selectItemsData);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPosition, setIsOpenPosition] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  const toggleStatePosition = () => {
    setIsOpenPosition((prevState) => !prevState);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Bars3Icon className='w-[24px] md:hidden text-white h-[25px]' />
      </SheetTrigger>
      <SheetContent className='w-full bg-cr-shark border-0 p-[20px] xs:max-w-[400px]'>
        <SheetTitle className='hidden'>Заголовок диалогового окна</SheetTitle>
        <SheetDescription className='hidden'>Описание диалогового окна</SheetDescription>
        <SheetClose asChild>
          <button aria-label='Закрыть' className='absolute top-[12px] right-[12px] text-white'>
            <XMarkIcon className='w-6 h-6' />
          </button>
        </SheetClose>
        <NavLink to='/' className='w-[76px] block h-[28px] ms-[8px] mb-[20px]'>
          <img className='block w-full h-full' src='/kslt.svg' alt='КСЛТ' />
        </NavLink>

        <ul className='font-bold'>
          {NavigationItems.map((itemMenu, id) => (
            <li key={id} className='mb-[8px]'>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-white w-[100%] block text-[#64B32C] rounded-[8px] py-[8px] px-[10px]'
                    : 'bg-transparent w-[100%] block text-white py-[8px] px-[10px]'
                }
                to={itemMenu.link}
              >
                {itemMenu.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className='pb-[15px] mb-[15px] border-b border-[#2f373d]'>
          {footerItemsData.length > 0 && footerItemsData[0].menuPosition.length > 0 && permission && (
            <div
              onClick={toggleStatePosition}
              className='flex items-center cursor-pointer gap-1 font-bold text-white py-[8px] px-[10px]'
            >
              Положение
              <ChevronDownIcon
                className={`w-4 h-4 transition-all ease-in-out duration-300 ${isOpenPosition ? 'rotate-180' : 'rotate-0'}`}
              />
            </div>
          )}
          <ul
            className={`overflow-hidden transition-all ease-in-out duration-500 ${
              isOpenPosition ? 'max-h-screen px-[10px]' : 'max-h-0 px-[10px]'
            }`}
          >
            {footerItemsData.length > 0 &&
              footerItemsData[0].menuPosition.map((menuItem) => (
                <li key={menuItem._id}>
                  <a className='font-bold px-2 py-3 text-[13px] text-white block' target='_blank' href={menuItem.value}>
                    {menuItem.name}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <ul>
          <li>
            {!user && (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-white w-[100%] block text-[#64B32C] rounded-[8px] py-[8px] px-[10px]'
                    : 'bg-transparent w-[100%] block text-white py-[8px] px-[10px]'
                }
                to='/login'
              >
                <span className='auth font-bold'>Авторизация</span>
              </NavLink>
            )}
          </li>
          {user && (
            <li className='mb-[5px]'>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-white w-[100%] block text-[#64B32C] rounded-[8px] py-[8px] px-[10px]'
                    : 'bg-transparent w-[100%] block text-white py-[8px] px-[10px]'
                }
                to='/personal-account'
              >
                <span className='font-bold'>Личный кабинет</span>
              </NavLink>
            </li>
          )}
          {user?.role === 'admin' && (
            <li className='mb-[5px]'>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'bg-white w-[100%] block text-[#64B32C] rounded-[8px] py-[8px] px-[10px]'
                    : 'bg-transparent w-[100%] block text-white py-[8px] px-[10px]'
                }
                to='/admin'
              >
                <span className='font-bold'>Панель администратора</span>
              </NavLink>
            </li>
          )}
          {user && (
            <li className='cursor-pointer py-[8px] block px-[10px]' onClick={handleLogout}>
              <span className='auth font-bold text-white '>Выйти</span>
            </li>
          )}
          <li className={'mt-5'}><ThemeSwitcher/></li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};
