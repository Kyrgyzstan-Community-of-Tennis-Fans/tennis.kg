import PartnersCard from '@/features/partners/components/PartnersCard';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectPartners, selectPartnersFetching } from '@/features/partners/partnerSlice';
import { useEffect, useState } from 'react';
import { createPartner, fetchPartner } from '@/features/partners/partnerThunks';
import { Button } from '@/components/ui/button';
import PartnersForm from '@/features/partners/components/PartnersForm';
import { Partner } from '@/types/partnerTypes';
import { Loader } from '@/components/Loader/Loader';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';

const AdminPartners = () => {
  const dispatch = useAppDispatch();
  const partners = useAppSelector(selectPartners);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const loading = useAppSelector(selectPartnersFetching);

  useEffect(() => {
    dispatch(fetchPartner());
  }, [dispatch]);

  const handleSubmit = async (partner: Partner) => {
    try {
      await dispatch(createPartner(partner));
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to create partner:', error);
    } finally {
    }
  };

  if (loading) {
    return <Loader fixed />;
  }
  return (
    <>
      <section>
        <header className={'flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5'}>
          <div>
            <h1 className={'text-lg font-medium leading-none'}>Партнеры</h1>
            <small className={'text-muted-foreground'}>Список всех партнеров и управление партнерами.</small>
          </div>
          <Button className={'w-full xs:w-max'} size={'sm'} onClick={() => setIsDialogOpen(true)}>
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
      </section>
    </>
  );
};

export default AdminPartners;
