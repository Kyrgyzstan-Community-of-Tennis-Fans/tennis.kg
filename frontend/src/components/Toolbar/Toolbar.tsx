import { Link, NavLink } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Toolbar = () => {
  return (
    <header className='py-[27px] bg-cr-shark'>
      <div className='container px-[50px]'>
        <div className='flex items-center justify-between'>
          <NavLink to='/'>
            <img className='block w-[98px] h-[36px]' src='public/kslt.svg' alt='КСЛТ' />
          </NavLink>

          <nav>
            <NavigationMenu>
              <NavigationMenuList className='text-white items-center gap-[55px]'>
                <NavigationMenuItem>
                  <NavLink to='/'>Главная</NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink to='/calendar'>Календарь</NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink to='/rating'>Рейтинг</NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink to='/news'>Блог</NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Положение</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='w-[300px]'>
                      <li className='p-[25px] hover:bg-gray-50 cursor-pointer transition-colors duration-200'>
                        <NavigationMenuLink className='block' href='https://google.com/' target='_blank'>
                          Положение КСЛТ
                        </NavigationMenuLink>
                      </li>
                      <li className='p-[25px] hover:bg-gray-50 cursor-pointer transition-colors duration-200'>
                        <NavigationMenuLink className='block' href='https://google.com/' target='_blank'>
                          Форма заявки на проведение турнира
                        </NavigationMenuLink>
                      </li>
                      <li className='p-[25px] hover:bg-gray-50 cursor-pointer transition-colors duration-200'>
                        <NavigationMenuLink className='block' href='https://google.com/' target='_blank'>
                          Таблица начисления рейтинговых очков
                        </NavigationMenuLink>
                      </li>
                      <li className='p-[25px] hover:bg-gray-50 cursor-pointer transition-colors duration-200'>
                        <NavigationMenuLink className='block' href='https://google.com/' target='_blank'>
                          Дисциплинарное положение КСЛТ
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <Link to='login'>Авторизация</Link>
        </div>
      </div>
    </header>
  );
};

export default Toolbar;
