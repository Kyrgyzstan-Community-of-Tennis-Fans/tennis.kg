import { useAppSelector } from '@/app/hooks';
import { CupIcon } from '@/assets/icons/CupIcon';
import { InfoTip } from '@/components/Confirm/InfoTip/InfoTip';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { selectUser } from '@/features/users/usersSlice';
import { cn } from '@/lib/utils';
import type { Reward } from '@/types/reward';
import { TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  className?: string;
  onDelete?: (id: string) => void;
  item: Reward;
  deletingId: string | null;
}

export const RewardCard: React.FC<Props> = ({ className, item, onDelete, deletingId }) => {
  const user = useAppSelector(selectUser);
  const { pathname } = useLocation();
  const isVisible = pathname === '/admin' && user && user.role === 'admin';

  return (
    <div className={cn('flex gap-2 justify-between border rounded-xl p-2', className)}>
      <div className={'flex items-center gap-2'}>
        <CupIcon className='size-9 text-[#64B32C]' />
        <div className={'flex flex-col'} key={item._id}>
          <span className={'font-medium'}>{item.title}</span>
          <small>{item.description}</small>
        </div>
      </div>

      {isVisible && (
        <>
          {onDelete && (
            <InfoTip delay={300} text={'Удалить награду'}>
              <Button onClick={() => onDelete(item._id)} size={'icon'} className={'size-7'}>
                {item._id === deletingId ? <Loader theme={'light'} size={'sm'} /> : <TrashIcon />}
              </Button>
            </InfoTip>
          )}
        </>
      )}
    </div>
  );
};
