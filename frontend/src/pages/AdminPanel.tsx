import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminPartners from '@/features/partners/AdminPartners';
import { Category } from '@/features/category/category';
import { AdminPaneBlockCarousel } from '@/features/carousel/AdminPaneBlockCarousel';
import { Layout } from '@/components/Layout';
import RatingMembersAdminList from '@/features/mainRatingMembers/RatingMembersAdmin/RatingMembersAdminList';
import { AdminNews } from '@/features/news/containers/AdminNews/AdminNews';

const AdminPanel = () => {
  return (
    <>
      <Layout>
        <h1 className={'text-center text-2xl sm:text-4xl mb-8 font-semibold'}>Панель Администратора</h1>
        <Tabs defaultValue='partners'>
          <TabsList className='grid w-full md:grid-cols-5 sm:grid-cols-5 xs:grid-cols-5 xs:mb-10 mb-36 '>
            <TabsTrigger value='partners'>Партнеры</TabsTrigger>
            <TabsTrigger value='category'>Категории</TabsTrigger>
            <TabsTrigger value='carousel'>Карусель</TabsTrigger>
            <TabsTrigger value='rating'>Рейтинг</TabsTrigger>
            <TabsTrigger value='news'>Новости</TabsTrigger>
          </TabsList>
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
