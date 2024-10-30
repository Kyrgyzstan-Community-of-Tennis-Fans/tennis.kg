import React from 'react';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@heroicons/react/20/solid';
import { Partner } from '@/types/partnerTypes';
import { API_URl } from '@/consts';
import { useAppDispatch } from '@/app/hooks';
import { deletePartner } from '@/features/partners/partnerThunks';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Props {
  partner: Partner;
}

const PartnersCard: React.FC<Props> = ({ partner }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    await dispatch(deletePartner(partner._id));
  };

  return (
    <div className='w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg bg-white/0 backdrop-blur-lg shadow-lg rounded-lg flex items-center p-4 space-x-4 mx-auto gap-5 mb-3'>
      <img alt='Логотип компании' className='w-14 h-14 rounded-full' src={`${API_URl}/${partner.image}`} />
      <div className='flex-1'>
        <h3 className='text-sm font-semibold text-gray-800'>{partner.name}</h3>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className='bg-red-700 text-white hover:bg-red-800'>
            <TrashIcon className='w-5 h-5' />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены, что хотите удалить?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Партнер будет удалена навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PartnersCard;
