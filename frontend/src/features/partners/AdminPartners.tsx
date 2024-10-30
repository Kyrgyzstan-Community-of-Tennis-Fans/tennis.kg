import PartnersCard from '@/features/partners/components/PartnersCard';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectPartners } from '@/features/partners/partnerSlice';
import { useEffect, useState } from 'react';
import { createPartner, fetchPartner } from '@/features/partners/partnerThunks';
import { Button } from '@/components/ui/button';
import PartnersForm from '@/features/partners/components/PartnersForm';
import { Partner } from '@/types/partnerTypes';

const AdminPartners = () => {
  const dispatch = useAppDispatch();
  const partners = useAppSelector(selectPartners);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPartner());
  }, [dispatch]);

  const handleSubmit = async (partner: Partner) => {
    try {
      dispatch(createPartner(partner));
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to create partner:', error);
    } finally {
    }
  };
  return (
    <>
      <div className='mt-16 pb-10  text-center border-4 h-auto ml-auto mr-auto rounded-lg shadow-partner w-full max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl  '>
        <h1 className={'text-black  text-2xl md:text-4xl font-medium mt-5'}>Партнеры</h1>
        <Button
          className={'bg-blue-500 mt-3 mb-3 hover:bg-blue-700 font-medium  text-sm md:text-base'}
          onClick={() => setIsDialogOpen(true)}
        >
          Добавить нового Партнера
        </Button>
        <hr />
        <div className='max-h-[500px] overflow-y-auto px-4 mt-5'>
          {partners.map((partner) => (
            <PartnersCard partner={partner} key={partner._id} />
          ))}
        </div>
        <PartnersForm isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default AdminPartners;
