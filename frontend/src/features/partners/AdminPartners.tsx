import { Layout } from '@/components/Layout';
import PartnersCard from '@/features/partners/components/PartnersCard';
import { Button } from '@/components/ui/button';
import PartnersForm from '@/features/partners/components/PartnersForm';
import { Loader } from '@/components/Loader/Loader';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { useAdminPartners } from '@/features/partners/hooks/useAdminPartners';

const AdminPartners = () => {
  const { partners, isDialogOpen, loading, handleSubmit, setIsDialogOpen } = useAdminPartners();

  if (loading) return <Loader fixed />;

  return (
    <Layout>
      <header className={'flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'}>
        <div>
          <h1 className={'text-2xl font-medium leading-none'}>Партнеры</h1>
          <small className={'text-muted-foreground text-base'}>Список всех партнеров и управление партнерами.</small>
        </div>
        <Button className={'w-full xs:w-max'} onClick={() => setIsDialogOpen(true)}>
          Добавить Партнера <SquaresPlusIcon />
        </Button>
      </header>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3'>
        {!loading && partners.length === 0 ? (
          <small>Партнеры не найдены. Добавьте партнеров.</small>
        ) : (
          partners.map((partner) => <PartnersCard partner={partner} key={partner._id} />)
        )}
        <PartnersForm isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default AdminPartners;
