import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Confirm } from '@/components/Confirm/Confirm';
import { Button } from '@/components/ui/button';
import { EventEdit } from '@/features/ratings/components/EventEdit/EventEdit';
import { deleteEvent, fetchRatings } from '@/features/ratings/ratingsThunks';
import { Event } from '@/types/eventTypes';
import type { Rating } from '@/types/ratingTypes';
import { ArrowRightIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useDialogState } from '@/features/news/hooks/useDialogState';
import { selectCurrentUser, selectUser } from '@/features/users/usersSlice';
import { fetchOneUser } from '@/features/users/usersThunks';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ErrorPage } from '@/components/Errors/ErrorPage';

interface Props {
  event: Event;
  ratings: Rating[];
}

export const EventCard: React.FC<Props> = ({ event, ratings }) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { category, link } = event;
  const idAdminPage = pathname.includes('admin');
  const user = useAppSelector(selectUser);
  const currentUser = useAppSelector(selectCurrentUser);
  const { open, toggleOpen } = useDialogState();

  const handleDelete = async () => {
    await dispatch(deleteEvent(event._id)).unwrap();
    await dispatch(fetchRatings()).unwrap();
    toast.success('Событие успешно удалено');
  };

  useEffect(() => {
    if (user) dispatch(fetchOneUser(user._id));
  }, [dispatch, user]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!currentUser?.isActive) {
      e.preventDefault();
      toggleOpen();
    }
  };

  return (
    <div id={'eventItem'} className={'space-y-2 .event-item p-3 border bg-gray-200 mb-3 rounded-lg flex-1 min-w-56 dark:bg-transparent dark:border-gray-200'}>
      <div className={'bg-[#64B32C42] px-2 rounded-md'}>
        <h3 className={'text-sm'}>
          Категория - <span className={'font-medium'}>{category.name}</span>
        </h3>
      </div>

      <div className={'flex justify-between'}>
        {idAdminPage && (
          <div className={'flex gap-1'}>
            <Confirm onOk={handleDelete}>
              <button className={'bg-primary text-white px-1.5 rounded-md dark:bg-transparent'}>
                <TrashIcon className={'size-5 stroke-[1.2]'} />
              </button>
            </Confirm>

            <EventEdit ratings={ratings} id={event._id}>
              <button className={'bg-primary text-white px-1.5 rounded-md dark:bg-transparent'}>
                <PencilSquareIcon className={'size-5 stroke-[1.2]'} />
              </button>
            </EventEdit>
          </div>
        )}
        <a id={'openRatingButton'} href={link} target={'_blank'} className={'block ml-auto'}>
          <Button
            size={'sm'}
            variant={'ghost'}
            className={
              'text-cr-green-700 .open-rating-button flex items-center ml-auto hover:bg-gray-200 hover:text-cr-green-900'
            }
          >
            Открыть рейтинг <ArrowRightIcon />
          </Button>
        </a>
      </div>

      {open && (
        <Dialog open={open} onOpenChange={toggleOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='text-2xl font-bold'>Внимание!</DialogTitle>
              <DialogDescription>
                <ErrorPage errorCode={401} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
