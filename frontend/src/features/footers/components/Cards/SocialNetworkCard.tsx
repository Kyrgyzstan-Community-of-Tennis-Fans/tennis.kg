import { Confirm } from '@/components/Confirm/Confirm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { SocialNetworkFields } from '@/types/footer';
import { toast } from 'sonner';
import { SocialIcon } from 'react-social-icons';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deleteOneSocialNetwork, getFooterItems } from '@/features/footers/footersThunks';
import { selectItemDeleting } from '@/features/footers/footersSlice';
import { Loader } from '@/components/Loader/Loader';
import SocialNetworkEditForm from '@/features/footers/components/SocialNetworkForms/SocialNetworkEditForm';

interface Props {
  item: SocialNetworkFields;
}

export const SocialNetworkCard: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const socialNetworkDeleting = useAppSelector(selectItemDeleting);

  const handleDelete = async () => {
    try {
      await dispatch(deleteOneSocialNetwork(item._id)).unwrap();
      await dispatch(getFooterItems());
    } catch (error) {
      console.error(error);
      toast.error('Что-то пошло не так, попробуйте еще раз.');
    }
  };

  return (
    <Card className={'p-3 shadow-none relative min-w-72 flex-1'}>
      <div className={'flex items-center gap-2 justify-between lg:flex-row flex-nowrap'}>
        <div className='flex items-center'>
          <SocialIcon
            network={item.name}
            bgColor='#393F43'
            fgColor='#fff'
            style={{ height: 30, width: 30, marginRight: '8px' }}
          />
          <h3>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h3>
        </div>

        <div className={'space-x-1 flex items-center'}>
          <Confirm onOk={handleDelete}>
            <Button disabled={Boolean(socialNetworkDeleting)} size={'sm'} data-test-id='delete'>
              {socialNetworkDeleting === item._id ? <Loader /> : <TrashIcon />}
            </Button>
          </Confirm>
          <SocialNetworkEditForm id={item._id} />
        </div>
      </div>
    </Card>
  );
};
