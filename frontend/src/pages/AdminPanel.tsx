import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminPartners from '@/features/partners/AdminPartners';
import { Category } from '@/features/category/category';
import { AdminPaneBlockCarousel } from '@/features/carousel/AdminPaneBlockCarousel';
import { Layout } from '@/components/Layout';
import { AdminNews } from '@/features/news/containers/AdminNews/AdminNews';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AdminRatings } from '@/features/ratings/AdminRatings';
import AdminPanelBlockFooter from '@/features/footers/containers/AdminPanelBlockFooter';
import { AdminUserList } from '@/features/users/AdminUserList';
import AdminCalendar from '@/features/tournaments/AdminCalendar';
import RatingMembersAdmin from '@/features/mainRatingMembers/RatingMembersAdmin';
import { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [currentTab, setCurrentTab] = useState<string>();

  useEffect(() => {
    const savedTab = localStorage.getItem('adminPanelTab');
    if (savedTab) {
      setCurrentTab(savedTab);
    }
  }, []);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    localStorage.setItem('adminPanelTab', newTab);
  };

  return (
      <>
        <Layout>
          <h1 className={'text-center text-2xl sm:text-4xl mb-8 font-semibold'}>Панель Администратора</h1>
          <Tabs value={currentTab} onValueChange={handleTabChange} orientation={'vertical'} defaultValue={'partners'}>
            <ScrollArea className={'max-w-max pb-3 mx-auto'}>
              <TabsList className='flex items-center gap-1'>
                <TabsTrigger value='partners'>Партнеры</TabsTrigger>
                <TabsTrigger value='category'>Категории</TabsTrigger>
                <TabsTrigger value='carousel'>Карусель</TabsTrigger>
                <TabsTrigger value='top'>Топ Игроки</TabsTrigger>
                <TabsTrigger value='calendar'>Календарь</TabsTrigger>
                <TabsTrigger value='rating'>Рейтинги</TabsTrigger>
                <TabsTrigger value='news'>Новости</TabsTrigger>
                <TabsTrigger value='footer'>Подвал сайта</TabsTrigger>
                <TabsTrigger value='users'>Список пользователей</TabsTrigger>
              </TabsList>
              <ScrollBar orientation={'horizontal'} />
            </ScrollArea>
            <TabsContent value='partners'>
              <AdminPartners />
            </TabsContent>
            <TabsContent value='category'>
              <Category />
            </TabsContent>
            <TabsContent value={'carousel'}>
              <AdminPaneBlockCarousel />
            </TabsContent>
            <TabsContent value={'top'}>
              <RatingMembersAdmin />
            </TabsContent>
            <TabsContent value={'calendar'}>
              <AdminCalendar />
            </TabsContent>
            <TabsContent value={'rating'}>
              <AdminRatings />
            </TabsContent>
            <TabsContent value={'news'}>
              <AdminNews />
            </TabsContent>
            <TabsContent value={'footer'}>
              <AdminPanelBlockFooter />
            </TabsContent>
            <TabsContent value={'users'}>
              <AdminUserList />
            </TabsContent>
          </Tabs>
        </Layout>
      </>
  );
};

export default AdminPanel;