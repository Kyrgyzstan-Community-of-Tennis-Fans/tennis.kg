import { Layout } from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SocialNetwork from '@/features/footers/containers/SocialNetwork';
import MenuPosition from '@/features/footers/containers/MenuPosition';
import PublicOffer from '@/features/footers/containers/PublicOffer';
import MainPartner from '@/features/footers/containers/MainPartner';
import { useEffect } from 'react';
import { getFooterItems } from '@/features/footers/footersThunks';
import { useAppDispatch } from '@/app/hooks';

const AdminPanelBlockFooter = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFooterItems());
  }, [dispatch]);

  return (
    <Layout>
      <header className={'flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5 mb-5'}>
        <div>
          <h1 className={'text-2xl font-medium leading-none'}>Подвал сайта</h1>
          <small className={'text-muted-foreground text-base'}>Элементы управления контентом и его созданием.</small>
        </div>
      </header>
      <Tabs defaultValue='social-network'>
        <TabsList className='grid w-full h-auto md:h-10 mb-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
          <TabsTrigger className='h-9 md:h-8' value='social-network'>
            Социальные сети
          </TabsTrigger>
          <TabsTrigger className='h-9 md:h-8' value='menu-position'>
            Меню положение
          </TabsTrigger>
          <TabsTrigger className='h-9 md:h-8' value='public-offer'>
            Публичная оферта
          </TabsTrigger>
          <TabsTrigger className='h-9 md:h-8' value='main-partner'>
            Главный партнер
          </TabsTrigger>
        </TabsList>
        <TabsContent value='social-network'>
          <SocialNetwork />
        </TabsContent>
        <TabsContent value='menu-position'>
          <MenuPosition />
        </TabsContent>
        <TabsContent value='public-offer'>
          <PublicOffer />
        </TabsContent>
        <TabsContent value='main-partner'>
          <MainPartner />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default AdminPanelBlockFooter;
