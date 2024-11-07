import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminPartners from '@/features/partners/AdminPartners';
import { Category } from '@/features/category/category';
import { AdminPaneBlockCarousel } from '@/features/carousel/AdminPaneBlockCarousel';
import { Layout } from '@/components/Layout';
import RatingMembersAdminList from '@/features/mainRatingMembers/RatingMembersAdmin/RatingMembersAdminList';
import { AdminNews } from '@/features/news/containers/AdminNews/AdminNews';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const AdminPanel = () => {
  return (
    <>
      <Layout>
        <h1 className={'text-center text-2xl sm:text-4xl mb-8 font-semibold'}>Панель Администратора</h1>
        <Tabs defaultValue='partners' orientation={'vertical'}>
          <ScrollArea className={'max-w-max pb-3'}>
            <TabsList className='flex items-center gap-1'>
              <TabsTrigger value='partners'>Партнеры</TabsTrigger>
              <TabsTrigger value='category'>Категории</TabsTrigger>
              <TabsTrigger value='carousel'>Карусель</TabsTrigger>
              <TabsTrigger value='rating'>Рейтинг</TabsTrigger>
              <TabsTrigger value='news'>Новости</TabsTrigger>
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
          <TabsContent value={'rating'}>
            <RatingMembersAdminList />
          </TabsContent>
          <TabsContent value={'news'}>
            <AdminNews />
          </TabsContent>
        </Tabs>
      </Layout>
    </>
  );
};

export default AdminPanel;