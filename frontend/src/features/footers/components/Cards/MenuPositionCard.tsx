import { Confirm } from '@/components/Confirm/Confirm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LinkIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { MenuPositionFields } from '@/types/footerTypes';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deleteMenuPosition, getFooterItems } from '@/features/footers/footersThunks';
import { selectItemDeleting } from '@/features/footers/footersSlice';
import { Loader } from '@/components/Loader/Loader';
import MenuPositionEditForm from '@/features/footers/components/MenuPositionForms/MenuPositionEditForm';

interface Props {
  item: MenuPositionFields;
}

export const MenuPositionCard: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const menuPositionDeleting = useAppSelector(selectItemDeleting);

  const handleDelete = async () => {
    try {
      await dispatch(deleteMenuPosition(item._id)).unwrap();
      await dispatch(getFooterItems());
    } catch (error) {
      console.error(error);
      toast.error('Что-то пошло не так, попробуйте еще раз.');
    }
  };

  return (
    <Card className={'p-3 shadow-none relative min-w-72 flex-1'}>
      <div className={'flex items-center gap-2 h-[100%] justify-between lg:flex-row flex-nowrap'}>
        <div className='flex items-center'>
          <LinkIcon className='h-[30px] w-[30px] mr-2 flex-shrink-0' />
          <h3 className='text-xs'>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h3>
        </div>

        <div className={'space-x-1 flex items-center'}>
          <Confirm onOk={handleDelete}>
            <Button disabled={Boolean(menuPositionDeleting)} size={'sm'}>
              {menuPositionDeleting === item._id ? <Loader /> : <TrashIcon />}
            </Button>
          </Confirm>
          <MenuPositionEditForm id={item._id} />
        </div>
      </div>
    </Card>
  );
};
