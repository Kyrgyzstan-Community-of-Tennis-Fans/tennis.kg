import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectItemsData } from '@/features/footers/footersSlice';
import { SocialIcon } from 'react-social-icons';
import { API_URl } from '@/consts';
import { NavigationItems } from '@/components/Navbar/MenuItems';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronUpIcon } from '@radix-ui/react-icons';
import { selectCurrentUser, selectUser } from '@/features/users/usersSlice';
import { useEffect } from 'react';
import { fetchOneUser } from '@/features/users/usersThunks';

const Footer = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const currentUser = useAppSelector(selectCurrentUser);
  const footerItemsData = useAppSelector(selectItemsData);

  useEffect(() => {
    if (user) dispatch(fetchOneUser(user._id));
  }, [dispatch, user]);

  return (
    <div className='bg-cr-shark pt-8 pb-4'>
      <div className='mx-auto max-w-[1335px] px-[16px] flex flex-col items-center justify-center lmd:items-start lmd:flex-row p-6 lg:px-8 lmd:justify-evenly gap-10'>
        <div className='basis-1/4 flex flex-col gap-5 lmd:gap-10'>
          <div className='flex lg:flex-1 justify-evenly lmd:justify-start'>
            <NavLink to='/' className='w-[98px] h-[36px]'>
              <img className='block w-full h-full' src='/kslt.svg' alt='КСЛТ' />
            </NavLink>
          </div>
          <div className='text-center lmd:text-left'>
            <p className='text-[#D9DBE1] mb-[8px]'>Copyright © 2022 KSLT</p>
            <p className='text-[#D9DBE1]'>All rights reserved</p>
          </div>
          <div className='flex flex-row justify-center lmd:justify-start gap-[16px]'>
            {footerItemsData.length > 0 &&
              footerItemsData[0].socialNetwork.map((item) => (
                <div key={item._id} className='inline-flex text-white gap-5'>
                  <SocialIcon
                    bgColor='#373A40'
                    target='_blank'
                    url={item.value}
                    fgColor='#fff'
                    style={{ height: '32px', width: '32px' }}
                    network={item.name}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className='flex flex-col text-center xs:text-left xs:flex-row xs:justify-between basis-1 lmd:basis-[55%] text-cr-white gap-10 xs:gap-0'>
          <div className='basis-1/3'>
            <h1 className='pb-7 text-lg xs:text-xl'>О нас</h1>
            <ul className='flex items-center xs:items-start flex-col gap-4 text-sm xs:text-base text-[#D9DBE1]'>
              {NavigationItems.map((itemMenu, id) => (
                <li key={id}>
                  <NavLink to={itemMenu.link} className='hover:text-white'>
                    {itemMenu.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <DropdownMenu>
                  {footerItemsData.length > 0 && footerItemsData[0].menuPosition.length > 0 && currentUser && (
                    <DropdownMenuTrigger className='flex cursor-pointer items-center gap-1 hover:text-white'>
                      Положение
                      <ChevronUpIcon className='w-4 h-4' />
                    </DropdownMenuTrigger>
                  )}
                  <DropdownMenuContent className='p-0 w-[302px]'>
                    {footerItemsData.length > 0 &&
                      footerItemsData[0].menuPosition.map((menuItem) => (
                        <DropdownMenuItem
                          key={menuItem._id}
                          className='hover:bg-gray-50 cursor-pointer p-0 transition-colors duration-200'
                        >
                          <a href={menuItem.value} target='_blank' className='p-[25px] w-full block text-[16px]'>
                            {menuItem.name}
                          </a>
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>

          <div className='basis-1/3'>
            <h1 className='pb-7 text-lg xs:text-xl'>Условия</h1>
            <ul className='gap-4 text-sm xs:text-base text-[#D9DBE1]'>
              <li>
                <a
                  target='_blank'
                  href={footerItemsData.length > 0 ? footerItemsData[0].publicOffer : ''}
                  className='hover:text-white'
                >
                  Публичная оферта
                </a>
              </li>
            </ul>
          </div>

          <div className='flex flex-col items-center basis-1/3'>
            <h1 className='pb-7 text-center text-xl'>Генеральный партнер</h1>
            <img
              src={
                footerItemsData.length > 0 && footerItemsData[0].mainPartnerImage
                  ? `${API_URl}/${footerItemsData[0].mainPartnerImage}`
                  : ''
              }
              alt='Генеральный партнер'
              className='w-[100px] h-[100px] block'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
