import { NavbarMobile } from '@/components/Navbar/NavbarMobile';
import { Link, NavLink } from 'react-router-dom';
import { NavBarDropDown } from '@/components/Navbar/NavBarDropDown';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useAppSelector } from '@/app/hooks';
import { selectItemsData } from '@/features/footers/footersSlice';
import { NavigationItems } from '@/components/Navbar/MenuItems';
import { selectUser, selectUserPermission } from '@/features/users/usersSlice';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';

const Navbar = () => {
  const user = useAppSelector(selectUser);
  const userPermission = useAppSelector(selectUserPermission);
  const footerItemsData = useAppSelector(selectItemsData);

  return (
    <div className='py-[20px] md:py-[27px] bg-cr-shark dark:bg-gray-900'>
      <div className='max-w-[1335px] px-[16px] mx-auto'>
        <div className='flex justify-between items-center'>
          <NavLink to='/' className='w-[76px] h-[28px] md:w-[98px] md:h-[36px]'>
            <img className='block w-full h-full' src='/kslt.svg' alt='КСЛТ' />
          </NavLink>

          <div className='md:hidden'>
            <NavbarMobile />
          </div>

          <div className='hidden md:block'>
            <ul className='flex items-center md:gap-[25px] lmd:gap-[55px]'>
              {NavigationItems.map((itemMenu, id) => (
                <li key={id}>
                  <NavLink
                    className={({ isActive }) => (isActive ? 'block text-[#64B32C]' : 'block text-white')}
                    to={itemMenu.link}
                  >
                    {itemMenu.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      {footerItemsData.length > 0 &&
                        footerItemsData[0].menuPosition.length > 0 &&
                        userPermission >= 1 && (
                          <NavigationMenuTrigger className='text-white'>Положение</NavigationMenuTrigger>
                        )}
                      <NavigationMenuContent>
                        <ul className='w-[300px]'>
                          {footerItemsData.length > 0 &&
                            footerItemsData[0].menuPosition.map((menuItem) => (
                              <li
                                key={menuItem._id}
                                className='hover:bg-gray-50 cursor-pointer transition-colors duration-200 dark:bg-gray-900'
                              >
                                <NavigationMenuLink className='block p-[25px]' href={menuItem.value} target='_blank'>
                                  {menuItem.name}
                                </NavigationMenuLink>
                              </li>
                            ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </li>
            </ul>
          </div>

          <div className='hidden md:flex items-center gap-10'>
            <ThemeSwitcher />
            {user ? (
              <NavBarDropDown />
            ) : (
              <Link className='auth text-white' to='/login'>
                Авторизация
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
