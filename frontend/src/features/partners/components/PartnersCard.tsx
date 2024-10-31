import React from 'react';
import { Button } from '@/components/ui/button';
import { Partner } from '@/types/partnerTypes';
import { API_URl } from '@/consts';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '@/app/hooks';
import { deletePartner } from '@/features/partners/partnerThunks';
import { Confirm } from '@/components/Confirm/Confirm';
import { PartnerEdit } from '@/features/partners/components/PartnerEdit';
import { toast } from 'sonner';

interface Props {
  partner: Partner;
}

const PartnersCard: React.FC<Props> = ({ partner }) => {
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    try {
      await dispatch(deletePartner(partner._id));
      toast.success('Успешно Удален');
    } catch (err) {
      toast.error('Что-то пошло не так попробуйте еще раз');
    }
  };

  return (
    <div className='w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg bg-white/0 backdrop-blur-lg shadow-lg rounded-lg flex items-center p-4 space-x-4 mx-auto gap-5 mb-3'>
      <img alt='Логотип компании' className='w-14 h-14 rounded-full' src={`${API_URl}/${partner.image}`} />
      <div className='flex-1'>
        <h3 className='text-sm font-semibold text-gray-800 hidden sm:block'>{partner.name}</h3>
      </div>
      <Confirm onOk={handleDelete}>
        <Button className='text-white sm'>
          <TrashIcon className='w-5 h-5' />
        </Button>
      </Confirm>
      <PartnerEdit id={partner._id}/>
    </div>
  );
};

export default PartnersCard;
